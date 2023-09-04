var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2016 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#include \"lockedpool.h\""},
{"lineNum":"    6","line":"#include \"cleanse.h\""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#if defined(HAVE_CONFIG_H)"},
{"lineNum":"    9","line":"#include \"../config/bitcoin-config.h\""},
{"lineNum":"   10","line":"#endif"},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"#ifdef WIN32"},
{"lineNum":"   13","line":"#ifdef _WIN32_WINNT"},
{"lineNum":"   14","line":"#undef _WIN32_WINNT"},
{"lineNum":"   15","line":"#endif"},
{"lineNum":"   16","line":"#define _WIN32_WINNT 0x0501"},
{"lineNum":"   17","line":"#define WIN32_LEAN_AND_MEAN 1"},
{"lineNum":"   18","line":"#ifndef NOMINMAX"},
{"lineNum":"   19","line":"#define NOMINMAX"},
{"lineNum":"   20","line":"#endif"},
{"lineNum":"   21","line":"#include <windows.h>"},
{"lineNum":"   22","line":"#else"},
{"lineNum":"   23","line":"#include <sys/mman.h> // for mmap"},
{"lineNum":"   24","line":"#include <sys/resource.h> // for getrlimit"},
{"lineNum":"   25","line":"#include <limits.h> // for PAGESIZE"},
{"lineNum":"   26","line":"#include <unistd.h> // for sysconf"},
{"lineNum":"   27","line":"#endif"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"#include <algorithm>"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"LockedPoolManager* LockedPoolManager::_instance = NULL;"},
{"lineNum":"   32","line":"std::once_flag LockedPoolManager::init_flag;"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"/*******************************************************************************/"},
{"lineNum":"   35","line":"// Utilities"},
{"lineNum":"   36","line":"//"},
{"lineNum":"   37","line":"/** Align up to power of 2 */"},
{"lineNum":"   38","line":"static inline size_t align_up(size_t x, size_t align)"},
{"lineNum":"   39","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   40","line":"    return (x + align - 1) & ~(align - 1);","class":"lineNoCov","hits":"0",},
{"lineNum":"   41","line":"}"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"/*******************************************************************************/"},
{"lineNum":"   44","line":"// Implementation: Arena"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"Arena::Arena(void *base_in, size_t size_in, size_t alignment_in):","class":"lineNoCov","hits":"0",},
{"lineNum":"   47","line":"    base(static_cast<char*>(base_in)), end(static_cast<char*>(base_in) + size_in), alignment(alignment_in)","class":"lineNoCov","hits":"0",},
{"lineNum":"   48","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   49","line":"    // Start with one free chunk that covers the entire arena"},
{"lineNum":"   50","line":"    chunks_free.emplace(base, size_in);","class":"lineNoCov","hits":"0",},
{"lineNum":"   51","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"Arena::~Arena()"},
{"lineNum":"   54","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   55","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"void* Arena::alloc(size_t size)"},
{"lineNum":"   58","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   59","line":"    // Round to next multiple of alignment"},
{"lineNum":"   60","line":"    size = align_up(size, alignment);","class":"lineNoCov","hits":"0",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    // Don\'t handle zero-sized chunks"},
{"lineNum":"   63","line":"    if (size == 0)","class":"lineNoCov","hits":"0",},
{"lineNum":"   64","line":"        return nullptr;","class":"lineNoCov","hits":"0",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    // Pick a large enough free-chunk"},
{"lineNum":"   67","line":"    auto it = std::find_if(chunks_free.begin(), chunks_free.end(),","class":"lineNoCov","hits":"0",},
{"lineNum":"   68","line":"        [=](const std::map<char*, size_t>::value_type& chunk){ return chunk.second >= size; });","class":"lineNoCov","hits":"0",},
{"lineNum":"   69","line":"    if (it == chunks_free.end())","class":"lineNoCov","hits":"0",},
{"lineNum":"   70","line":"        return nullptr;","class":"lineNoCov","hits":"0",},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    // Create the used-chunk, taking its space from the end of the free-chunk"},
{"lineNum":"   73","line":"    auto alloced = chunks_used.emplace(it->first + it->second - size, size).first;","class":"lineNoCov","hits":"0",},
{"lineNum":"   74","line":"    if (!(it->second -= size))","class":"lineNoCov","hits":"0",},
{"lineNum":"   75","line":"        chunks_free.erase(it);","class":"lineNoCov","hits":"0",},
{"lineNum":"   76","line":"    return reinterpret_cast<void*>(alloced->first);","class":"lineNoCov","hits":"0",},
{"lineNum":"   77","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"/* extend the Iterator if other begins at its end */"},
{"lineNum":"   80","line":"template <class Iterator, class Pair> bool extend(Iterator it, const Pair& other) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   81","line":"    if (it->first + it->second == other.first) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   82","line":"        it->second += other.second;","class":"lineNoCov","hits":"0",},
{"lineNum":"   83","line":"        return true;","class":"lineNoCov","hits":"0",},
{"lineNum":"   84","line":"    }"},
{"lineNum":"   85","line":"    return false;","class":"lineNoCov","hits":"0",},
{"lineNum":"   86","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"void Arena::free(void *ptr)"},
{"lineNum":"   89","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   90","line":"    // Freeing the NULL pointer is OK."},
{"lineNum":"   91","line":"    if (ptr == nullptr) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   92","line":"        return;","class":"lineNoCov","hits":"0",},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    // Remove chunk from used map"},
{"lineNum":"   96","line":"    auto i = chunks_used.find(static_cast<char*>(ptr));","class":"lineNoCov","hits":"0",},
{"lineNum":"   97","line":"    if (i == chunks_used.end()) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   98","line":"        throw std::runtime_error(\"Arena: invalid or double free\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":"    auto freed = *i;","class":"lineNoCov","hits":"0",},
{"lineNum":"  101","line":"    chunks_used.erase(i);","class":"lineNoCov","hits":"0",},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    // Add space to free map, coalescing contiguous chunks"},
{"lineNum":"  104","line":"    auto next = chunks_free.upper_bound(freed.first);","class":"lineNoCov","hits":"0",},
{"lineNum":"  105","line":"    auto prev = (next == chunks_free.begin()) ? chunks_free.end() : std::prev(next);","class":"lineNoCov","hits":"0",},
{"lineNum":"  106","line":"    if (prev == chunks_free.end() || !extend(prev, freed))","class":"lineNoCov","hits":"0",},
{"lineNum":"  107","line":"        prev = chunks_free.emplace_hint(next, freed);","class":"lineNoCov","hits":"0",},
{"lineNum":"  108","line":"    if (next != chunks_free.end() && extend(prev, *next))","class":"lineNoCov","hits":"0",},
{"lineNum":"  109","line":"        chunks_free.erase(next);","class":"lineNoCov","hits":"0",},
{"lineNum":"  110","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"Arena::Stats Arena::stats() const"},
{"lineNum":"  113","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  114","line":"    Arena::Stats r{ 0, 0, 0, chunks_used.size(), chunks_free.size() };","class":"lineNoCov","hits":"0",},
{"lineNum":"  115","line":"    for (const auto& chunk: chunks_used)","class":"lineNoCov","hits":"0",},
{"lineNum":"  116","line":"        r.used += chunk.second;","class":"lineNoCov","hits":"0",},
{"lineNum":"  117","line":"    for (const auto& chunk: chunks_free)","class":"lineNoCov","hits":"0",},
{"lineNum":"  118","line":"        r.free += chunk.second;","class":"lineNoCov","hits":"0",},
{"lineNum":"  119","line":"    r.total = r.used + r.free;","class":"lineNoCov","hits":"0",},
{"lineNum":"  120","line":"    return r;","class":"lineNoCov","hits":"0",},
{"lineNum":"  121","line":"}"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"#ifdef ARENA_DEBUG"},
{"lineNum":"  124","line":"void printchunk(char* base, size_t sz, bool used) {"},
{"lineNum":"  125","line":"    std::cout <<"},
{"lineNum":"  126","line":"        \"0x\" << std::hex << std::setw(16) << std::setfill(\'0\') << base <<"},
{"lineNum":"  127","line":"        \" 0x\" << std::hex << std::setw(16) << std::setfill(\'0\') << sz <<"},
{"lineNum":"  128","line":"        \" 0x\" << used << std::endl;"},
{"lineNum":"  129","line":"}"},
{"lineNum":"  130","line":"void Arena::walk() const"},
{"lineNum":"  131","line":"{"},
{"lineNum":"  132","line":"    for (const auto& chunk: chunks_used)"},
{"lineNum":"  133","line":"        printchunk(chunk.first, chunk.second, true);"},
{"lineNum":"  134","line":"    std::cout << std::endl;"},
{"lineNum":"  135","line":"    for (const auto& chunk: chunks_free)"},
{"lineNum":"  136","line":"        printchunk(chunk.first, chunk.second, false);"},
{"lineNum":"  137","line":"    std::cout << std::endl;"},
{"lineNum":"  138","line":"}"},
{"lineNum":"  139","line":"#endif"},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"/*******************************************************************************/"},
{"lineNum":"  142","line":"// Implementation: Win32LockedPageAllocator"},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"#ifdef WIN32"},
{"lineNum":"  145","line":"/** LockedPageAllocator specialized for Windows."},
{"lineNum":"  146","line":" */"},
{"lineNum":"  147","line":"class Win32LockedPageAllocator: public LockedPageAllocator"},
{"lineNum":"  148","line":"{"},
{"lineNum":"  149","line":"public:"},
{"lineNum":"  150","line":"    Win32LockedPageAllocator();"},
{"lineNum":"  151","line":"    void* AllocateLocked(size_t len, bool *lockingSuccess);"},
{"lineNum":"  152","line":"    void FreeLocked(void* addr, size_t len);"},
{"lineNum":"  153","line":"    size_t GetLimit();"},
{"lineNum":"  154","line":"private:"},
{"lineNum":"  155","line":"    size_t page_size;"},
{"lineNum":"  156","line":"};"},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"Win32LockedPageAllocator::Win32LockedPageAllocator()"},
{"lineNum":"  159","line":"{"},
{"lineNum":"  160","line":"    // Determine system page size in bytes"},
{"lineNum":"  161","line":"    SYSTEM_INFO sSysInfo;"},
{"lineNum":"  162","line":"    GetSystemInfo(&sSysInfo);"},
{"lineNum":"  163","line":"    page_size = sSysInfo.dwPageSize;"},
{"lineNum":"  164","line":"}"},
{"lineNum":"  165","line":"void *Win32LockedPageAllocator::AllocateLocked(size_t len, bool *lockingSuccess)"},
{"lineNum":"  166","line":"{"},
{"lineNum":"  167","line":"    len = align_up(len, page_size);"},
{"lineNum":"  168","line":"    void *addr = VirtualAlloc(nullptr, len, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);"},
{"lineNum":"  169","line":"    if (addr) {"},
{"lineNum":"  170","line":"        // VirtualLock is used to attempt to keep keying material out of swap. Note"},
{"lineNum":"  171","line":"        // that it does not provide this as a guarantee, but, in practice, memory"},
{"lineNum":"  172","line":"        // that has been VirtualLock\'d almost never gets written to the pagefile"},
{"lineNum":"  173","line":"        // except in rare circumstances where memory is extremely low."},
{"lineNum":"  174","line":"        *lockingSuccess = VirtualLock(const_cast<void*>(addr), len) != 0;"},
{"lineNum":"  175","line":"    }"},
{"lineNum":"  176","line":"    return addr;"},
{"lineNum":"  177","line":"}"},
{"lineNum":"  178","line":"void Win32LockedPageAllocator::FreeLocked(void* addr, size_t len)"},
{"lineNum":"  179","line":"{"},
{"lineNum":"  180","line":"    len = align_up(len, page_size);"},
{"lineNum":"  181","line":"    memory_cleanse(addr, len);"},
{"lineNum":"  182","line":"    VirtualUnlock(const_cast<void*>(addr), len);"},
{"lineNum":"  183","line":"}"},
{"lineNum":"  184","line":""},
{"lineNum":"  185","line":"size_t Win32LockedPageAllocator::GetLimit()"},
{"lineNum":"  186","line":"{"},
{"lineNum":"  187","line":"    // TODO is there a limit on windows, how to get it?"},
{"lineNum":"  188","line":"    return std::numeric_limits<size_t>::max();"},
{"lineNum":"  189","line":"}"},
{"lineNum":"  190","line":"#endif"},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"/*******************************************************************************/"},
{"lineNum":"  193","line":"// Implementation: PosixLockedPageAllocator"},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"#ifndef WIN32"},
{"lineNum":"  196","line":"/** LockedPageAllocator specialized for OSes that don\'t try to be"},
{"lineNum":"  197","line":" * special snowflakes."},
{"lineNum":"  198","line":" */"},
{"lineNum":"  199","line":"class PosixLockedPageAllocator: public LockedPageAllocator","class":"lineNoCov","hits":"0",},
{"lineNum":"  200","line":"{"},
{"lineNum":"  201","line":"public:"},
{"lineNum":"  202","line":"    PosixLockedPageAllocator();"},
{"lineNum":"  203","line":"    void* AllocateLocked(size_t len, bool *lockingSuccess);"},
{"lineNum":"  204","line":"    void FreeLocked(void* addr, size_t len);"},
{"lineNum":"  205","line":"    size_t GetLimit();"},
{"lineNum":"  206","line":"private:"},
{"lineNum":"  207","line":"    size_t page_size;"},
{"lineNum":"  208","line":"};"},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"PosixLockedPageAllocator::PosixLockedPageAllocator()","class":"lineNoCov","hits":"0",},
{"lineNum":"  211","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  212","line":"    // Determine system page size in bytes"},
{"lineNum":"  213","line":"#if defined(PAGESIZE) // defined in limits.h"},
{"lineNum":"  214","line":"    page_size = PAGESIZE;"},
{"lineNum":"  215","line":"#else                   // assume some POSIX OS"},
{"lineNum":"  216","line":"    page_size = sysconf(_SC_PAGESIZE);","class":"lineNoCov","hits":"0",},
{"lineNum":"  217","line":"#endif"},
{"lineNum":"  218","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  219","line":""},
{"lineNum":"  220","line":"// Some systems (at least OS X) do not define MAP_ANONYMOUS yet and define"},
{"lineNum":"  221","line":"// MAP_ANON which is deprecated"},
{"lineNum":"  222","line":"#ifndef MAP_ANONYMOUS"},
{"lineNum":"  223","line":"#define MAP_ANONYMOUS MAP_ANON"},
{"lineNum":"  224","line":"#endif"},
{"lineNum":"  225","line":""},
{"lineNum":"  226","line":"void *PosixLockedPageAllocator::AllocateLocked(size_t len, bool *lockingSuccess)"},
{"lineNum":"  227","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  228","line":"    void *addr;"},
{"lineNum":"  229","line":"    len = align_up(len, page_size);","class":"lineNoCov","hits":"0",},
{"lineNum":"  230","line":"    addr = mmap(nullptr, len, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);","class":"lineNoCov","hits":"0",},
{"lineNum":"  231","line":"    if (addr) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  232","line":"        *lockingSuccess = mlock(addr, len) == 0;","class":"lineNoCov","hits":"0",},
{"lineNum":"  233","line":"    }"},
{"lineNum":"  234","line":"    return addr;","class":"lineNoCov","hits":"0",},
{"lineNum":"  235","line":"}"},
{"lineNum":"  236","line":"void PosixLockedPageAllocator::FreeLocked(void* addr, size_t len)"},
{"lineNum":"  237","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  238","line":"    len = align_up(len, page_size);","class":"lineNoCov","hits":"0",},
{"lineNum":"  239","line":"    memory_cleanse(addr, len);","class":"lineNoCov","hits":"0",},
{"lineNum":"  240","line":"    munlock(addr, len);","class":"lineNoCov","hits":"0",},
{"lineNum":"  241","line":"    munmap(addr, len);","class":"lineNoCov","hits":"0",},
{"lineNum":"  242","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  243","line":"size_t PosixLockedPageAllocator::GetLimit()"},
{"lineNum":"  244","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  245","line":"#ifdef RLIMIT_MEMLOCK"},
{"lineNum":"  246","line":"    struct rlimit rlim;"},
{"lineNum":"  247","line":"    if (getrlimit(RLIMIT_MEMLOCK, &rlim) == 0) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  248","line":"        if (rlim.rlim_cur != RLIM_INFINITY) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  249","line":"            return rlim.rlim_cur;","class":"lineNoCov","hits":"0",},
{"lineNum":"  250","line":"        }"},
{"lineNum":"  251","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"  252","line":"#endif"},
{"lineNum":"  253","line":"    return std::numeric_limits<size_t>::max();","class":"lineNoCov","hits":"0",},
{"lineNum":"  254","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  255","line":"#endif"},
{"lineNum":"  256","line":""},
{"lineNum":"  257","line":"/*******************************************************************************/"},
{"lineNum":"  258","line":"// Implementation: LockedPool"},
{"lineNum":"  259","line":""},
{"lineNum":"  260","line":"LockedPool::LockedPool(std::unique_ptr<LockedPageAllocator> allocator_in, LockingFailed_Callback lf_cb_in):","class":"lineNoCov","hits":"0",},
{"lineNum":"  261","line":"    allocator(std::move(allocator_in)), lf_cb(lf_cb_in), cumulative_bytes_locked(0)","class":"lineNoCov","hits":"0",},
{"lineNum":"  262","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  263","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  264","line":""},
{"lineNum":"  265","line":"LockedPool::~LockedPool()"},
{"lineNum":"  266","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  267","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  268","line":"void* LockedPool::alloc(size_t size)"},
{"lineNum":"  269","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  270","line":"    std::lock_guard<std::mutex> lock(mutex);","class":"lineNoCov","hits":"0",},
{"lineNum":"  271","line":""},
{"lineNum":"  272","line":"    // Don\'t handle impossible sizes"},
{"lineNum":"  273","line":"    if (size == 0 || size > ARENA_SIZE)","class":"lineNoCov","hits":"0",},
{"lineNum":"  274","line":"        return nullptr;","class":"lineNoCov","hits":"0",},
{"lineNum":"  275","line":""},
{"lineNum":"  276","line":"    // Try allocating from each current arena"},
{"lineNum":"  277","line":"    for (auto &arena: arenas) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  278","line":"        void *addr = arena.alloc(size);","class":"lineNoCov","hits":"0",},
{"lineNum":"  279","line":"        if (addr) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  280","line":"            return addr;","class":"lineNoCov","hits":"0",},
{"lineNum":"  281","line":"        }"},
{"lineNum":"  282","line":"    }"},
{"lineNum":"  283","line":"    // If that fails, create a new one"},
{"lineNum":"  284","line":"    if (new_arena(ARENA_SIZE, ARENA_ALIGN)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  285","line":"        return arenas.back().alloc(size);","class":"lineNoCov","hits":"0",},
{"lineNum":"  286","line":"    }"},
{"lineNum":"  287","line":"    return nullptr;","class":"lineNoCov","hits":"0",},
{"lineNum":"  288","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  289","line":""},
{"lineNum":"  290","line":"void LockedPool::free(void *ptr)"},
{"lineNum":"  291","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  292","line":"    std::lock_guard<std::mutex> lock(mutex);","class":"lineNoCov","hits":"0",},
{"lineNum":"  293","line":"    // TODO we can do better than this linear search by keeping a map of arena"},
{"lineNum":"  294","line":"    // extents to arena, and looking up the address."},
{"lineNum":"  295","line":"    for (auto &arena: arenas) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  296","line":"        if (arena.addressInArena(ptr)) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  297","line":"            arena.free(ptr);","class":"lineNoCov","hits":"0",},
{"lineNum":"  298","line":"            return;"},
{"lineNum":"  299","line":"        }"},
{"lineNum":"  300","line":"    }"},
{"lineNum":"  301","line":"    throw std::runtime_error(\"LockedPool: invalid address not pointing to any arena\");","class":"lineNoCov","hits":"0",},
{"lineNum":"  302","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  303","line":""},
{"lineNum":"  304","line":"LockedPool::Stats LockedPool::stats() const"},
{"lineNum":"  305","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  306","line":"    std::lock_guard<std::mutex> lock(mutex);","class":"lineNoCov","hits":"0",},
{"lineNum":"  307","line":"    LockedPool::Stats r{0, 0, 0, cumulative_bytes_locked, 0, 0};","class":"lineNoCov","hits":"0",},
{"lineNum":"  308","line":"    for (const auto &arena: arenas) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  309","line":"        Arena::Stats i = arena.stats();","class":"lineNoCov","hits":"0",},
{"lineNum":"  310","line":"        r.used += i.used;","class":"lineNoCov","hits":"0",},
{"lineNum":"  311","line":"        r.free += i.free;","class":"lineNoCov","hits":"0",},
{"lineNum":"  312","line":"        r.total += i.total;","class":"lineNoCov","hits":"0",},
{"lineNum":"  313","line":"        r.chunks_used += i.chunks_used;","class":"lineNoCov","hits":"0",},
{"lineNum":"  314","line":"        r.chunks_free += i.chunks_free;","class":"lineNoCov","hits":"0",},
{"lineNum":"  315","line":"    }"},
{"lineNum":"  316","line":"    return r;"},
{"lineNum":"  317","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  318","line":""},
{"lineNum":"  319","line":"bool LockedPool::new_arena(size_t size, size_t align)"},
{"lineNum":"  320","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  321","line":"    bool locked;"},
{"lineNum":"  322","line":"    // If this is the first arena, handle this specially: Cap the upper size"},
{"lineNum":"  323","line":"    // by the process limit. This makes sure that the first arena will at least"},
{"lineNum":"  324","line":"    // be locked. An exception to this is if the process limit is 0:"},
{"lineNum":"  325","line":"    // in this case no memory can be locked at all so we\'ll skip past this logic."},
{"lineNum":"  326","line":"    if (arenas.empty()) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  327","line":"        size_t limit = allocator->GetLimit();","class":"lineNoCov","hits":"0",},
{"lineNum":"  328","line":"        if (limit > 0) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  329","line":"            size = std::min(size, limit);","class":"lineNoCov","hits":"0",},
{"lineNum":"  330","line":"        }"},
{"lineNum":"  331","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"  332","line":"    void *addr = allocator->AllocateLocked(size, &locked);","class":"lineNoCov","hits":"0",},
{"lineNum":"  333","line":"    if (!addr) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  334","line":"        return false;","class":"lineNoCov","hits":"0",},
{"lineNum":"  335","line":"    }"},
{"lineNum":"  336","line":"    if (locked) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  337","line":"        cumulative_bytes_locked += size;","class":"lineNoCov","hits":"0",},
{"lineNum":"  338","line":"    } else if (lf_cb) { // Call the locking-failed callback if locking failed","class":"lineNoCov","hits":"0",},
{"lineNum":"  339","line":"        if (!lf_cb()) { // If the callback returns false, free the memory and fail, otherwise consider the user warned and proceed.","class":"lineNoCov","hits":"0",},
{"lineNum":"  340","line":"            allocator->FreeLocked(addr, size);","class":"lineNoCov","hits":"0",},
{"lineNum":"  341","line":"            return false;","class":"lineNoCov","hits":"0",},
{"lineNum":"  342","line":"        }"},
{"lineNum":"  343","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"  344","line":"    arenas.emplace_back(allocator.get(), addr, size, align);","class":"lineNoCov","hits":"0",},
{"lineNum":"  345","line":"    return true;","class":"lineNoCov","hits":"0",},
{"lineNum":"  346","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  347","line":""},
{"lineNum":"  348","line":"LockedPool::LockedPageArena::LockedPageArena(LockedPageAllocator *allocator_in, void *base_in, size_t size_in, size_t align_in):"},
{"lineNum":"  349","line":"    Arena(base_in, size_in, align_in), base(base_in), size(size_in), allocator(allocator_in)","class":"lineNoCov","hits":"0",},
{"lineNum":"  350","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  351","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  352","line":"LockedPool::LockedPageArena::~LockedPageArena()"},
{"lineNum":"  353","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  354","line":"    allocator->FreeLocked(base, size);","class":"lineNoCov","hits":"0",},
{"lineNum":"  355","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  356","line":""},
{"lineNum":"  357","line":"/*******************************************************************************/"},
{"lineNum":"  358","line":"// Implementation: LockedPoolManager"},
{"lineNum":"  359","line":"//"},
{"lineNum":"  360","line":"LockedPoolManager::LockedPoolManager(std::unique_ptr<LockedPageAllocator> allocator):"},
{"lineNum":"  361","line":"    LockedPool(std::move(allocator), &LockedPoolManager::LockingFailed)","class":"lineNoCov","hits":"0",},
{"lineNum":"  362","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  363","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  364","line":""},
{"lineNum":"  365","line":"bool LockedPoolManager::LockingFailed()"},
{"lineNum":"  366","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  367","line":"    // TODO: log something but how? without including util.h"},
{"lineNum":"  368","line":"    return true;","class":"lineNoCov","hits":"0",},
{"lineNum":"  369","line":"}"},
{"lineNum":"  370","line":""},
{"lineNum":"  371","line":"void LockedPoolManager::CreateInstance()"},
{"lineNum":"  372","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"  373","line":"    // Using a local static instance guarantees that the object is initialized"},
{"lineNum":"  374","line":"    // when it\'s first needed and also deinitialized after all objects that use"},
{"lineNum":"  375","line":"    // it are done with it.  I can think of one unlikely scenario where we may"},
{"lineNum":"  376","line":"    // have a static deinitialization order/problem, but the check in"},
{"lineNum":"  377","line":"    // LockedPoolManagerBase\'s destructor helps us detect if that ever happens."},
{"lineNum":"  378","line":"#ifdef WIN32"},
{"lineNum":"  379","line":"    std::unique_ptr<LockedPageAllocator> allocator(new Win32LockedPageAllocator());"},
{"lineNum":"  380","line":"#else"},
{"lineNum":"  381","line":"    std::unique_ptr<LockedPageAllocator> allocator(new PosixLockedPageAllocator());","class":"lineNoCov","hits":"0",},
{"lineNum":"  382","line":"#endif"},
{"lineNum":"  383","line":"    static LockedPoolManager instance(std::move(allocator));","class":"lineNoCov","hits":"0",},
{"lineNum":"  384","line":"    LockedPoolManager::_instance = &instance;","class":"lineNoCov","hits":"0",},
{"lineNum":"  385","line":"}","class":"lineNoCov","hits":"0",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "", "date" : "2023-08-29 14:59:42", "instrumented" : 146, "covered" : 0,};
var merged_data = [];
