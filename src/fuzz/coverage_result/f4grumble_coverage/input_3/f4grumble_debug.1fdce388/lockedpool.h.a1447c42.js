var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2016 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#ifndef BITCOIN_SUPPORT_LOCKEDPOOL_H"},
{"lineNum":"    6","line":"#define BITCOIN_SUPPORT_LOCKEDPOOL_H"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#include <stdint.h>"},
{"lineNum":"    9","line":"#include <list>"},
{"lineNum":"   10","line":"#include <map>"},
{"lineNum":"   11","line":"#include <mutex>"},
{"lineNum":"   12","line":"#include <memory>"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"/**"},
{"lineNum":"   15","line":" * OS-dependent allocation and deallocation of locked/pinned memory pages."},
{"lineNum":"   16","line":" * Abstract base class."},
{"lineNum":"   17","line":" */"},
{"lineNum":"   18","line":"class LockedPageAllocator","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   19","line":"{"},
{"lineNum":"   20","line":"public:"},
{"lineNum":"   21","line":"    virtual ~LockedPageAllocator() {}","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"   22","line":"    /** Allocate and lock memory pages."},
{"lineNum":"   23","line":"     * If len is not a multiple of the system page size, it is rounded up."},
{"lineNum":"   24","line":"     * Returns 0 in case of allocation failure."},
{"lineNum":"   25","line":"     *"},
{"lineNum":"   26","line":"     * If locking the memory pages could not be accomplished it will still"},
{"lineNum":"   27","line":"     * return the memory, however the lockingSuccess flag will be false."},
{"lineNum":"   28","line":"     * lockingSuccess is undefined if the allocation fails."},
{"lineNum":"   29","line":"     */"},
{"lineNum":"   30","line":"    virtual void* AllocateLocked(size_t len, bool *lockingSuccess) = 0;"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    /** Unlock and free memory pages."},
{"lineNum":"   33","line":"     * Clear the memory before unlocking."},
{"lineNum":"   34","line":"     */"},
{"lineNum":"   35","line":"    virtual void FreeLocked(void* addr, size_t len) = 0;"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    /** Get the total limit on the amount of memory that may be locked by this"},
{"lineNum":"   38","line":"     * process, in bytes. Return size_t max if there is no limit or the limit"},
{"lineNum":"   39","line":"     * is unknown. Return 0 if no memory can be locked at all."},
{"lineNum":"   40","line":"     */"},
{"lineNum":"   41","line":"    virtual size_t GetLimit() = 0;"},
{"lineNum":"   42","line":"};"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"/* An arena manages a contiguous region of memory by dividing it into"},
{"lineNum":"   45","line":" * chunks."},
{"lineNum":"   46","line":" */"},
{"lineNum":"   47","line":"class Arena"},
{"lineNum":"   48","line":"{"},
{"lineNum":"   49","line":"public:"},
{"lineNum":"   50","line":"    Arena(void *base, size_t size, size_t alignment);"},
{"lineNum":"   51","line":"    virtual ~Arena();"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    /** Memory statistics. */"},
{"lineNum":"   54","line":"    struct Stats"},
{"lineNum":"   55","line":"    {"},
{"lineNum":"   56","line":"        size_t used;"},
{"lineNum":"   57","line":"        size_t free;"},
{"lineNum":"   58","line":"        size_t total;"},
{"lineNum":"   59","line":"        size_t chunks_used;"},
{"lineNum":"   60","line":"        size_t chunks_free;"},
{"lineNum":"   61","line":"    };"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    /** Allocate size bytes from this arena."},
{"lineNum":"   64","line":"     * Returns pointer on success, or 0 if memory is full or"},
{"lineNum":"   65","line":"     * the application tried to allocate 0 bytes."},
{"lineNum":"   66","line":"     */"},
{"lineNum":"   67","line":"    void* alloc(size_t size);"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    /** Free a previously allocated chunk of memory."},
{"lineNum":"   70","line":"     * Freeing the zero pointer has no effect."},
{"lineNum":"   71","line":"     * Raises std::runtime_error in case of error."},
{"lineNum":"   72","line":"     */"},
{"lineNum":"   73","line":"    void free(void *ptr);"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    /** Get arena usage statistics */"},
{"lineNum":"   76","line":"    Stats stats() const;"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"#ifdef ARENA_DEBUG"},
{"lineNum":"   79","line":"    void walk() const;"},
{"lineNum":"   80","line":"#endif"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    /** Return whether a pointer points inside this arena."},
{"lineNum":"   83","line":"     * This returns base <= ptr < (base+size) so only use it for (inclusive)"},
{"lineNum":"   84","line":"     * chunk starting addresses."},
{"lineNum":"   85","line":"     */"},
{"lineNum":"   86","line":"    bool addressInArena(void *ptr) const { return ptr >= base && ptr < end; }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   87","line":"private:"},
{"lineNum":"   88","line":"    Arena(const Arena& other) = delete; // non construction-copyable"},
{"lineNum":"   89","line":"    Arena& operator=(const Arena&) = delete; // non copyable"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    /** Map of chunk address to chunk information. This class makes use of the"},
{"lineNum":"   92","line":"     * sorted order to merge previous and next chunks during deallocation."},
{"lineNum":"   93","line":"     */"},
{"lineNum":"   94","line":"    std::map<char*, size_t> chunks_free;"},
{"lineNum":"   95","line":"    std::map<char*, size_t> chunks_used;"},
{"lineNum":"   96","line":"    /** Base address of arena */"},
{"lineNum":"   97","line":"    char* base;"},
{"lineNum":"   98","line":"    /** End address of arena */"},
{"lineNum":"   99","line":"    char* end;"},
{"lineNum":"  100","line":"    /** Minimum chunk alignment */"},
{"lineNum":"  101","line":"    size_t alignment;"},
{"lineNum":"  102","line":"};"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"/** Pool for locked memory chunks."},
{"lineNum":"  105","line":" *"},
{"lineNum":"  106","line":" * To avoid sensitive key data from being swapped to disk, the memory in this pool"},
{"lineNum":"  107","line":" * is locked/pinned."},
{"lineNum":"  108","line":" *"},
{"lineNum":"  109","line":" * An arena manages a contiguous region of memory. The pool starts out with one arena"},
{"lineNum":"  110","line":" * but can grow to multiple arenas if the need arises."},
{"lineNum":"  111","line":" *"},
{"lineNum":"  112","line":" * Unlike a normal C heap, the administrative structures are separate from the managed"},
{"lineNum":"  113","line":" * memory. This has been done as the sizes and bases of objects are not in themselves sensitive"},
{"lineNum":"  114","line":" * information, as to conserve precious locked memory. In some operating systems"},
{"lineNum":"  115","line":" * the amount of memory that can be locked is small."},
{"lineNum":"  116","line":" */"},
{"lineNum":"  117","line":"class LockedPool"},
{"lineNum":"  118","line":"{"},
{"lineNum":"  119","line":"public:"},
{"lineNum":"  120","line":"    /** Size of one arena of locked memory. This is a compromise."},
{"lineNum":"  121","line":"     * Do not set this too low, as managing many arenas will increase"},
{"lineNum":"  122","line":"     * allocation and deallocation overhead. Setting it too high allocates"},
{"lineNum":"  123","line":"     * more locked memory from the OS than strictly necessary."},
{"lineNum":"  124","line":"     */"},
{"lineNum":"  125","line":"    static const size_t ARENA_SIZE = 256*1024;"},
{"lineNum":"  126","line":"    /** Chunk alignment. Another compromise. Setting this too high will waste"},
{"lineNum":"  127","line":"     * memory, setting it too low will facilitate fragmentation."},
{"lineNum":"  128","line":"     */"},
{"lineNum":"  129","line":"    static const size_t ARENA_ALIGN = 16;"},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"    /** Callback when allocation succeeds but locking fails."},
{"lineNum":"  132","line":"     */"},
{"lineNum":"  133","line":"    typedef bool (*LockingFailed_Callback)();"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"    /** Memory statistics. */"},
{"lineNum":"  136","line":"    struct Stats"},
{"lineNum":"  137","line":"    {"},
{"lineNum":"  138","line":"        size_t used;"},
{"lineNum":"  139","line":"        size_t free;"},
{"lineNum":"  140","line":"        size_t total;"},
{"lineNum":"  141","line":"        size_t locked;"},
{"lineNum":"  142","line":"        size_t chunks_used;"},
{"lineNum":"  143","line":"        size_t chunks_free;"},
{"lineNum":"  144","line":"    };"},
{"lineNum":"  145","line":""},
{"lineNum":"  146","line":"    /** Create a new LockedPool. This takes ownership of the MemoryPageLocker,"},
{"lineNum":"  147","line":"     * you can only instantiate this with LockedPool(std::move(...))."},
{"lineNum":"  148","line":"     *"},
{"lineNum":"  149","line":"     * The second argument is an optional callback when locking a newly allocated arena failed."},
{"lineNum":"  150","line":"     * If this callback is provided and returns false, the allocation fails (hard fail), if"},
{"lineNum":"  151","line":"     * it returns true the allocation proceeds, but it could warn."},
{"lineNum":"  152","line":"     */"},
{"lineNum":"  153","line":"    LockedPool(std::unique_ptr<LockedPageAllocator> allocator, LockingFailed_Callback lf_cb_in = 0);"},
{"lineNum":"  154","line":"    ~LockedPool();"},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    /** Allocate size bytes from this arena."},
{"lineNum":"  157","line":"     * Returns pointer on success, or 0 if memory is full or"},
{"lineNum":"  158","line":"     * the application tried to allocate 0 bytes."},
{"lineNum":"  159","line":"     */"},
{"lineNum":"  160","line":"    void* alloc(size_t size);"},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"    /** Free a previously allocated chunk of memory."},
{"lineNum":"  163","line":"     * Freeing the zero pointer has no effect."},
{"lineNum":"  164","line":"     * Raises std::runtime_error in case of error."},
{"lineNum":"  165","line":"     */"},
{"lineNum":"  166","line":"    void free(void *ptr);"},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    /** Get pool usage statistics */"},
{"lineNum":"  169","line":"    Stats stats() const;"},
{"lineNum":"  170","line":"private:"},
{"lineNum":"  171","line":"    LockedPool(const LockedPool& other) = delete; // non construction-copyable"},
{"lineNum":"  172","line":"    LockedPool& operator=(const LockedPool&) = delete; // non copyable"},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"    std::unique_ptr<LockedPageAllocator> allocator;"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"    /** Create an arena from locked pages */"},
{"lineNum":"  177","line":"    class LockedPageArena: public Arena"},
{"lineNum":"  178","line":"    {"},
{"lineNum":"  179","line":"    public:"},
{"lineNum":"  180","line":"        LockedPageArena(LockedPageAllocator *alloc_in, void *base_in, size_t size, size_t align);"},
{"lineNum":"  181","line":"        ~LockedPageArena();"},
{"lineNum":"  182","line":"    private:"},
{"lineNum":"  183","line":"        void *base;"},
{"lineNum":"  184","line":"        size_t size;"},
{"lineNum":"  185","line":"        LockedPageAllocator *allocator;"},
{"lineNum":"  186","line":"    };"},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"    bool new_arena(size_t size, size_t align);"},
{"lineNum":"  189","line":""},
{"lineNum":"  190","line":"    std::list<LockedPageArena> arenas;"},
{"lineNum":"  191","line":"    LockingFailed_Callback lf_cb;"},
{"lineNum":"  192","line":"    size_t cumulative_bytes_locked;"},
{"lineNum":"  193","line":"    /** Mutex protects access to this pool\'s data structures, including arenas."},
{"lineNum":"  194","line":"     */"},
{"lineNum":"  195","line":"    mutable std::mutex mutex;"},
{"lineNum":"  196","line":"};"},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"/**"},
{"lineNum":"  199","line":" * Singleton class to keep track of locked (ie, non-swappable) memory, for use in"},
{"lineNum":"  200","line":" * std::allocator templates."},
{"lineNum":"  201","line":" *"},
{"lineNum":"  202","line":" * Some implementations of the STL allocate memory in some constructors (i.e., see"},
{"lineNum":"  203","line":" * MSVC\'s vector<T> implementation where it allocates 1 byte of memory in the allocator.)"},
{"lineNum":"  204","line":" * Due to the unpredictable order of static initializers, we have to make sure the"},
{"lineNum":"  205","line":" * LockedPoolManager instance exists before any other STL-based objects that use"},
{"lineNum":"  206","line":" * secure_allocator are created. So instead of having LockedPoolManager also be"},
{"lineNum":"  207","line":" * static-initialized, it is created on demand."},
{"lineNum":"  208","line":" */"},
{"lineNum":"  209","line":"class LockedPoolManager : public LockedPool","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  210","line":"{"},
{"lineNum":"  211","line":"public:"},
{"lineNum":"  212","line":"    /** Return the current instance, or create it once */"},
{"lineNum":"  213","line":"    static LockedPoolManager& Instance()"},
{"lineNum":"  214","line":"    {"},
{"lineNum":"  215","line":"        std::call_once(LockedPoolManager::init_flag, LockedPoolManager::CreateInstance);"},
{"lineNum":"  216","line":"        return *LockedPoolManager::_instance;"},
{"lineNum":"  217","line":"    }"},
{"lineNum":"  218","line":""},
{"lineNum":"  219","line":"private:"},
{"lineNum":"  220","line":"    LockedPoolManager(std::unique_ptr<LockedPageAllocator> allocator);"},
{"lineNum":"  221","line":""},
{"lineNum":"  222","line":"    /** Create a new LockedPoolManager specialized to the OS */"},
{"lineNum":"  223","line":"    static void CreateInstance();"},
{"lineNum":"  224","line":"    /** Called when locking fails, warn the user here */"},
{"lineNum":"  225","line":"    static bool LockingFailed();"},
{"lineNum":"  226","line":""},
{"lineNum":"  227","line":"    static LockedPoolManager* _instance;"},
{"lineNum":"  228","line":"    static std::once_flag init_flag;"},
{"lineNum":"  229","line":"};"},
{"lineNum":"  230","line":""},
{"lineNum":"  231","line":"#endif // BITCOIN_SUPPORT_LOCKEDPOOL_H"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "f4grumble_debug", "date" : "2023-08-29 14:57:44", "instrumented" : 4, "covered" : 0,};
var merged_data = [];
