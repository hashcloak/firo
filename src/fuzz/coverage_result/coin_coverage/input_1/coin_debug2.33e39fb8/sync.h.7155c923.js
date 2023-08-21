var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2009-2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2016 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#ifndef BITCOIN_SYNC_H"},
{"lineNum":"    7","line":"#define BITCOIN_SYNC_H"},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"#include \"threadsafety.h\""},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"#include <boost/thread/condition_variable.hpp>"},
{"lineNum":"   12","line":"#include <boost/thread/locks.hpp>"},
{"lineNum":"   13","line":"#include <boost/thread/mutex.hpp>"},
{"lineNum":"   14","line":"#include <boost/thread/recursive_mutex.hpp>"},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"////////////////////////////////////////////////"},
{"lineNum":"   18","line":"//                                            //"},
{"lineNum":"   19","line":"// THE SIMPLE DEFINITION, EXCLUDING DEBUG CODE //"},
{"lineNum":"   20","line":"//                                            //"},
{"lineNum":"   21","line":"////////////////////////////////////////////////"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"/*"},
{"lineNum":"   24","line":"CCriticalSection mutex;"},
{"lineNum":"   25","line":"    boost::recursive_mutex mutex;"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"LOCK(mutex);"},
{"lineNum":"   28","line":"    boost::unique_lock<boost::recursive_mutex> criticalblock(mutex);"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"LOCK2(mutex1, mutex2);"},
{"lineNum":"   31","line":"    boost::unique_lock<boost::recursive_mutex> criticalblock1(mutex1);"},
{"lineNum":"   32","line":"    boost::unique_lock<boost::recursive_mutex> criticalblock2(mutex2);"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"TRY_LOCK(mutex, name);"},
{"lineNum":"   35","line":"    boost::unique_lock<boost::recursive_mutex> name(mutex, boost::try_to_lock_t);"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"ENTER_CRITICAL_SECTION(mutex); // no RAII"},
{"lineNum":"   38","line":"    mutex.lock();"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"LEAVE_CRITICAL_SECTION(mutex); // no RAII"},
{"lineNum":"   41","line":"    mutex.unlock();"},
{"lineNum":"   42","line":" */"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"///////////////////////////////"},
{"lineNum":"   45","line":"//                           //"},
{"lineNum":"   46","line":"// THE ACTUAL IMPLEMENTATION //"},
{"lineNum":"   47","line":"//                           //"},
{"lineNum":"   48","line":"///////////////////////////////"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"/**"},
{"lineNum":"   51","line":" * Template mixin that adds -Wthread-safety locking"},
{"lineNum":"   52","line":" * annotations to a subset of the mutex API."},
{"lineNum":"   53","line":" */"},
{"lineNum":"   54","line":"template <typename PARENT>"},
{"lineNum":"   55","line":"class LOCKABLE AnnotatedMixin : public PARENT","class":"lineCov","hits":"4","order":"28","possible_hits":"4",},
{"lineNum":"   56","line":"{"},
{"lineNum":"   57","line":"public:"},
{"lineNum":"   58","line":"    void lock() EXCLUSIVE_LOCK_FUNCTION()"},
{"lineNum":"   59","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"        PARENT::lock();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    void unlock() UNLOCK_FUNCTION()"},
{"lineNum":"   64","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   65","line":"        PARENT::unlock();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    bool try_lock() EXCLUSIVE_TRYLOCK_FUNCTION(true)"},
{"lineNum":"   69","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":"        return PARENT::try_lock();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    }"},
{"lineNum":"   72","line":"};"},
{"lineNum":"   73","line":"#ifdef DEBUG_LOCKORDER"},
{"lineNum":"   74","line":"void EnterCritical(const char* pszName, const char* pszFile, int nLine, void* cs, bool fTry = false);"},
{"lineNum":"   75","line":"void LeaveCritical();"},
{"lineNum":"   76","line":"std::string LocksHeld();"},
{"lineNum":"   77","line":"void AssertLockHeldInternal(const char* pszName, const char* pszFile, int nLine, void* cs);"},
{"lineNum":"   78","line":"void AssertLockNotHeldInternal(const char* pszName, const char* pszFile, int nLine, void* cs);"},
{"lineNum":"   79","line":"void DeleteLock(void* cs);"},
{"lineNum":"   80","line":"#else"},
{"lineNum":"   81","line":"void static inline EnterCritical(const char* pszName, const char* pszFile, int nLine, void* cs, bool fTry = false) {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   82","line":"void static inline LeaveCritical() {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   83","line":"void static inline AssertLockHeldInternal(const char* pszName, const char* pszFile, int nLine, void* cs) {}"},
{"lineNum":"   84","line":"void static inline AssertLockNotHeldInternal(const char* pszName, const char* pszFile, int nLine, void* cs) {}"},
{"lineNum":"   85","line":"void static inline DeleteLock(void* cs) {}","class":"lineCov","hits":"2","order":"39","possible_hits":"2",},
{"lineNum":"   86","line":"#endif"},
{"lineNum":"   87","line":"#define AssertLockHeld(cs) AssertLockHeldInternal(#cs, __FILE__, __LINE__, &cs)"},
{"lineNum":"   88","line":"#define AssertLockNotHeld(cs) AssertLockNotHeldInternal(#cs, __FILE__, __LINE__, &cs)"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"/**"},
{"lineNum":"   91","line":" * Wrapped boost mutex: supports recursive locking, but no waiting"},
{"lineNum":"   92","line":" * TODO: We should move away from using the recursive lock by default."},
{"lineNum":"   93","line":" */"},
{"lineNum":"   94","line":"class CCriticalSection : public AnnotatedMixin<boost::recursive_mutex>","class":"lineCov","hits":"2","order":"27","possible_hits":"2",},
{"lineNum":"   95","line":"{"},
{"lineNum":"   96","line":"public:"},
{"lineNum":"   97","line":"    ~CCriticalSection() {","class":"lineCov","hits":"2","order":"37","possible_hits":"2",},
{"lineNum":"   98","line":"        DeleteLock((void*)this);","class":"lineCov","hits":"1","order":"38","possible_hits":"1",},
{"lineNum":"   99","line":"    }","class":"lineCov","hits":"1","order":"40","possible_hits":"1",},
{"lineNum":"  100","line":"};"},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"typedef CCriticalSection CDynamicCriticalSection;"},
{"lineNum":"  103","line":"/** Wrapped boost mutex: supports waiting but not recursive locking */"},
{"lineNum":"  104","line":"typedef AnnotatedMixin<boost::mutex> CWaitableCriticalSection;"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"/** Just a typedef for boost::condition_variable, can be wrapped later if desired */"},
{"lineNum":"  107","line":"typedef boost::condition_variable CConditionVariable;"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"#ifdef DEBUG_LOCKCONTENTION"},
{"lineNum":"  110","line":"void PrintLockContention(const char* pszName, const char* pszFile, int nLine);"},
{"lineNum":"  111","line":"#endif"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"/** Wrapper around boost::unique_lock<Mutex> */"},
{"lineNum":"  114","line":"template <typename Mutex>"},
{"lineNum":"  115","line":"class SCOPED_LOCKABLE CMutexLock"},
{"lineNum":"  116","line":"{"},
{"lineNum":"  117","line":"private:"},
{"lineNum":"  118","line":"    boost::unique_lock<Mutex> lock;"},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    void Enter(const char* pszName, const char* pszFile, int nLine)"},
{"lineNum":"  121","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  122","line":"        EnterCritical(pszName, pszFile, nLine, (void*)(lock.mutex()));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"#ifdef DEBUG_LOCKCONTENTION"},
{"lineNum":"  124","line":"        if (!lock.try_lock()) {"},
{"lineNum":"  125","line":"            PrintLockContention(pszName, pszFile, nLine);"},
{"lineNum":"  126","line":"#endif"},
{"lineNum":"  127","line":"            lock.lock();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":"#ifdef DEBUG_LOCKCONTENTION"},
{"lineNum":"  129","line":"        }"},
{"lineNum":"  130","line":"#endif"},
{"lineNum":"  131","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    bool TryEnter(const char* pszName, const char* pszFile, int nLine)"},
{"lineNum":"  134","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  135","line":"        EnterCritical(pszName, pszFile, nLine, (void*)(lock.mutex()), true);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"        lock.try_lock();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"        if (!lock.owns_lock())","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":"            LeaveCritical();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"        return lock.owns_lock();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":"    }"},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"public:"},
{"lineNum":"  143","line":"    CMutexLock(Mutex& mutexIn, const char* pszName, const char* pszFile, int nLine, bool fTry = false) EXCLUSIVE_LOCK_FUNCTION(mutexIn) : lock(mutexIn, boost::defer_lock)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  145","line":"        if (fTry)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"            TryEnter(pszName, pszFile, nLine);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"        else"},
{"lineNum":"  148","line":"            Enter(pszName, pszFile, nLine);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"    CMutexLock(Mutex* pmutexIn, const char* pszName, const char* pszFile, int nLine, bool fTry = false) EXCLUSIVE_LOCK_FUNCTION(pmutexIn)"},
{"lineNum":"  152","line":"    {"},
{"lineNum":"  153","line":"        if (!pmutexIn) return;"},
{"lineNum":"  154","line":""},
{"lineNum":"  155","line":"        lock = boost::unique_lock<Mutex>(*pmutexIn, boost::defer_lock);"},
{"lineNum":"  156","line":"        if (fTry)"},
{"lineNum":"  157","line":"            TryEnter(pszName, pszFile, nLine);"},
{"lineNum":"  158","line":"        else"},
{"lineNum":"  159","line":"            Enter(pszName, pszFile, nLine);"},
{"lineNum":"  160","line":"    }"},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"    ~CMutexLock() UNLOCK_FUNCTION()"},
{"lineNum":"  163","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  164","line":"        if (lock.owns_lock())","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":"            LeaveCritical();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    operator bool()"},
{"lineNum":"  169","line":"    {"},
{"lineNum":"  170","line":"        return lock.owns_lock();"},
{"lineNum":"  171","line":"    }"},
{"lineNum":"  172","line":"};"},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"typedef CMutexLock<CCriticalSection> CCriticalBlock;"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"#define PASTE(x, y) x ## y"},
{"lineNum":"  177","line":"#define PASTE2(x, y) PASTE(x, y)"},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"#define LOCK(cs) CCriticalBlock PASTE2(criticalblock, __COUNTER__)(cs, #cs, __FILE__, __LINE__)"},
{"lineNum":"  180","line":"#define LOCK2(cs1, cs2) CCriticalBlock criticalblock1(cs1, #cs1, __FILE__, __LINE__), criticalblock2(cs2, #cs2, __FILE__, __LINE__)"},
{"lineNum":"  181","line":"#define TRY_LOCK(cs, name) CCriticalBlock name(cs, #cs, __FILE__, __LINE__, true)"},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"#define ENTER_CRITICAL_SECTION(cs)                            \\"},
{"lineNum":"  184","line":"    {                                                         \\"},
{"lineNum":"  185","line":"        EnterCritical(#cs, __FILE__, __LINE__, (void*)(&cs)); \\"},
{"lineNum":"  186","line":"        (cs).lock();                                          \\"},
{"lineNum":"  187","line":"    }"},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"#define LEAVE_CRITICAL_SECTION(cs) \\"},
{"lineNum":"  190","line":"    {                              \\"},
{"lineNum":"  191","line":"        (cs).unlock();             \\"},
{"lineNum":"  192","line":"        LeaveCritical();           \\"},
{"lineNum":"  193","line":"    }"},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"class CSemaphore"},
{"lineNum":"  196","line":"{"},
{"lineNum":"  197","line":"private:"},
{"lineNum":"  198","line":"    boost::condition_variable condition;"},
{"lineNum":"  199","line":"    boost::mutex mutex;"},
{"lineNum":"  200","line":"    int value;"},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"public:"},
{"lineNum":"  203","line":"    CSemaphore(int init) : value(init) {}"},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"    void wait()"},
{"lineNum":"  206","line":"    {"},
{"lineNum":"  207","line":"        boost::unique_lock<boost::mutex> lock(mutex);"},
{"lineNum":"  208","line":"        while (value < 1) {"},
{"lineNum":"  209","line":"            condition.wait(lock);"},
{"lineNum":"  210","line":"        }"},
{"lineNum":"  211","line":"        value--;"},
{"lineNum":"  212","line":"    }"},
{"lineNum":"  213","line":""},
{"lineNum":"  214","line":"    bool try_wait()"},
{"lineNum":"  215","line":"    {"},
{"lineNum":"  216","line":"        boost::unique_lock<boost::mutex> lock(mutex);"},
{"lineNum":"  217","line":"        if (value < 1)"},
{"lineNum":"  218","line":"            return false;"},
{"lineNum":"  219","line":"        value--;"},
{"lineNum":"  220","line":"        return true;"},
{"lineNum":"  221","line":"    }"},
{"lineNum":"  222","line":""},
{"lineNum":"  223","line":"    void post()"},
{"lineNum":"  224","line":"    {"},
{"lineNum":"  225","line":"        {"},
{"lineNum":"  226","line":"            boost::unique_lock<boost::mutex> lock(mutex);"},
{"lineNum":"  227","line":"            value++;"},
{"lineNum":"  228","line":"        }"},
{"lineNum":"  229","line":"        condition.notify_one();"},
{"lineNum":"  230","line":"    }"},
{"lineNum":"  231","line":"};"},
{"lineNum":"  232","line":""},
{"lineNum":"  233","line":"/** RAII-style semaphore lock */"},
{"lineNum":"  234","line":"class CSemaphoreGrant"},
{"lineNum":"  235","line":"{"},
{"lineNum":"  236","line":"private:"},
{"lineNum":"  237","line":"    CSemaphore* sem;"},
{"lineNum":"  238","line":"    bool fHaveGrant;"},
{"lineNum":"  239","line":""},
{"lineNum":"  240","line":"public:"},
{"lineNum":"  241","line":"    void Acquire()"},
{"lineNum":"  242","line":"    {"},
{"lineNum":"  243","line":"        if (fHaveGrant)"},
{"lineNum":"  244","line":"            return;"},
{"lineNum":"  245","line":"        sem->wait();"},
{"lineNum":"  246","line":"        fHaveGrant = true;"},
{"lineNum":"  247","line":"    }"},
{"lineNum":"  248","line":""},
{"lineNum":"  249","line":"    void Release()"},
{"lineNum":"  250","line":"    {"},
{"lineNum":"  251","line":"        if (!fHaveGrant)"},
{"lineNum":"  252","line":"            return;"},
{"lineNum":"  253","line":"        sem->post();"},
{"lineNum":"  254","line":"        fHaveGrant = false;"},
{"lineNum":"  255","line":"    }"},
{"lineNum":"  256","line":""},
{"lineNum":"  257","line":"    bool TryAcquire()"},
{"lineNum":"  258","line":"    {"},
{"lineNum":"  259","line":"        if (!fHaveGrant && sem->try_wait())"},
{"lineNum":"  260","line":"            fHaveGrant = true;"},
{"lineNum":"  261","line":"        return fHaveGrant;"},
{"lineNum":"  262","line":"    }"},
{"lineNum":"  263","line":""},
{"lineNum":"  264","line":"    void MoveTo(CSemaphoreGrant& grant)"},
{"lineNum":"  265","line":"    {"},
{"lineNum":"  266","line":"        grant.Release();"},
{"lineNum":"  267","line":"        grant.sem = sem;"},
{"lineNum":"  268","line":"        grant.fHaveGrant = fHaveGrant;"},
{"lineNum":"  269","line":"        fHaveGrant = false;"},
{"lineNum":"  270","line":"    }"},
{"lineNum":"  271","line":""},
{"lineNum":"  272","line":"    CSemaphoreGrant() : sem(NULL), fHaveGrant(false) {}"},
{"lineNum":"  273","line":""},
{"lineNum":"  274","line":"    CSemaphoreGrant(CSemaphore& sema, bool fTry = false) : sem(&sema), fHaveGrant(false)"},
{"lineNum":"  275","line":"    {"},
{"lineNum":"  276","line":"        if (fTry)"},
{"lineNum":"  277","line":"            TryAcquire();"},
{"lineNum":"  278","line":"        else"},
{"lineNum":"  279","line":"            Acquire();"},
{"lineNum":"  280","line":"    }"},
{"lineNum":"  281","line":""},
{"lineNum":"  282","line":"    ~CSemaphoreGrant()"},
{"lineNum":"  283","line":"    {"},
{"lineNum":"  284","line":"        Release();"},
{"lineNum":"  285","line":"    }"},
{"lineNum":"  286","line":""},
{"lineNum":"  287","line":"    operator bool()"},
{"lineNum":"  288","line":"    {"},
{"lineNum":"  289","line":"        return fHaveGrant;"},
{"lineNum":"  290","line":"    }"},
{"lineNum":"  291","line":"};"},
{"lineNum":"  292","line":""},
{"lineNum":"  293","line":"#endif // BITCOIN_SYNC_H"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug2", "date" : "2023-08-17 10:55:54", "instrumented" : 36, "covered" : 6,};
var merged_data = [];
