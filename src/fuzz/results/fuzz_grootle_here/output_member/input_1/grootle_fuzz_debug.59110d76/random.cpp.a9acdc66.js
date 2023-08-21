var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2009-2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2016 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#include \"random.h\""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#include \"crypto/sha512.h\""},
{"lineNum":"    9","line":"#include \"support/cleanse.h\""},
{"lineNum":"   10","line":"#ifdef WIN32"},
{"lineNum":"   11","line":"#include \"compat.h\" // for Windows API"},
{"lineNum":"   12","line":"#include <wincrypt.h>"},
{"lineNum":"   13","line":"#endif"},
{"lineNum":"   14","line":"#include \"util.h\"             // for LogPrint()"},
{"lineNum":"   15","line":"#include \"utilstrencodings.h\" // for GetTime()"},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"#include <stdlib.h>"},
{"lineNum":"   18","line":"#include <limits>"},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"#ifndef WIN32"},
{"lineNum":"   21","line":"#include <sys/time.h>"},
{"lineNum":"   22","line":"#endif"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"#include <openssl/err.h>"},
{"lineNum":"   25","line":"#include <openssl/rand.h>"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"static void RandFailure()"},
{"lineNum":"   28","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   29","line":"    LogPrintf(\"Failed to read randomness, aborting\\n\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   30","line":"    abort();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"static inline int64_t GetPerformanceCounter()"},
{"lineNum":"   34","line":"{","class":"lineCov","hits":"2","order":"88","possible_hits":"2",},
{"lineNum":"   35","line":"    int64_t nCounter = 0;","class":"lineCov","hits":"1","order":"89","possible_hits":"1",},
{"lineNum":"   36","line":"#ifdef WIN32"},
{"lineNum":"   37","line":"    QueryPerformanceCounter((LARGE_INTEGER*)&nCounter);"},
{"lineNum":"   38","line":"#else"},
{"lineNum":"   39","line":"    timeval t;"},
{"lineNum":"   40","line":"    gettimeofday(&t, NULL);","class":"lineCov","hits":"1","order":"90","possible_hits":"1",},
{"lineNum":"   41","line":"    nCounter = (int64_t)(t.tv_sec * 1000000 + t.tv_usec);","class":"lineCov","hits":"1","order":"91","possible_hits":"1",},
{"lineNum":"   42","line":"#endif"},
{"lineNum":"   43","line":"    return nCounter;","class":"lineCov","hits":"1","order":"92","possible_hits":"1",},
{"lineNum":"   44","line":"}"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"void RandAddSeed()"},
{"lineNum":"   47","line":"{","class":"lineCov","hits":"2","order":"85","possible_hits":"2",},
{"lineNum":"   48","line":"    // Seed with CPU performance counter"},
{"lineNum":"   49","line":"    int64_t nCounter = GetPerformanceCounter();","class":"lineCov","hits":"1","order":"86","possible_hits":"1",},
{"lineNum":"   50","line":"    RAND_add(&nCounter, sizeof(nCounter), 1.5);","class":"lineCov","hits":"1","order":"93","possible_hits":"1",},
{"lineNum":"   51","line":"    memory_cleanse((void*)&nCounter, sizeof(nCounter));","class":"lineCov","hits":"1","order":"94","possible_hits":"1",},
{"lineNum":"   52","line":"}","class":"lineCov","hits":"2","order":"87","possible_hits":"2",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"static void RandAddSeedPerfmon()"},
{"lineNum":"   55","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":"    RandAddSeed();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"#ifdef WIN32"},
{"lineNum":"   59","line":"    // Don\'t need this on Linux, OpenSSL automatically uses /dev/urandom"},
{"lineNum":"   60","line":"    // Seed with the entire set of perfmon data"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    // This can take up to 2 seconds, so only do it every 10 minutes"},
{"lineNum":"   63","line":"    static int64_t nLastPerfmon;"},
{"lineNum":"   64","line":"    if (GetTime() < nLastPerfmon + 10 * 60)"},
{"lineNum":"   65","line":"        return;"},
{"lineNum":"   66","line":"    nLastPerfmon = GetTime();"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    std::vector<unsigned char> vData(250000, 0);"},
{"lineNum":"   69","line":"    long ret = 0;"},
{"lineNum":"   70","line":"    unsigned long nSize = 0;"},
{"lineNum":"   71","line":"    const size_t nMaxSize = 10000000; // Bail out at more than 10MB of performance data"},
{"lineNum":"   72","line":"    while (true) {"},
{"lineNum":"   73","line":"        nSize = vData.size();"},
{"lineNum":"   74","line":"        ret = RegQueryValueExA(HKEY_PERFORMANCE_DATA, \"Global\", NULL, NULL, vData.data(), &nSize);"},
{"lineNum":"   75","line":"        if (ret != ERROR_MORE_DATA || vData.size() >= nMaxSize)"},
{"lineNum":"   76","line":"            break;"},
{"lineNum":"   77","line":"        vData.resize(std::max((vData.size() * 3) / 2, nMaxSize)); // Grow size of buffer exponentially"},
{"lineNum":"   78","line":"    }"},
{"lineNum":"   79","line":"    RegCloseKey(HKEY_PERFORMANCE_DATA);"},
{"lineNum":"   80","line":"    if (ret == ERROR_SUCCESS) {"},
{"lineNum":"   81","line":"        RAND_add(vData.data(), nSize, nSize / 100.0);"},
{"lineNum":"   82","line":"        memory_cleanse(vData.data(), nSize);"},
{"lineNum":"   83","line":"        LogPrint(\"rand\", \"%s: %lu bytes\\n\", __func__, nSize);"},
{"lineNum":"   84","line":"    } else {"},
{"lineNum":"   85","line":"        static bool warned = false; // Warn only once"},
{"lineNum":"   86","line":"        if (!warned) {"},
{"lineNum":"   87","line":"            LogPrintf(\"%s: Warning: RegQueryValueExA(HKEY_PERFORMANCE_DATA) failed with code %i\\n\", __func__, ret);"},
{"lineNum":"   88","line":"            warned = true;"},
{"lineNum":"   89","line":"        }"},
{"lineNum":"   90","line":"    }"},
{"lineNum":"   91","line":"#endif"},
{"lineNum":"   92","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"/** Get 32 bytes of system entropy. */"},
{"lineNum":"   95","line":"void GetOSRand(unsigned char *ent32)"},
{"lineNum":"   96","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   97","line":"#ifdef WIN32"},
{"lineNum":"   98","line":"    HCRYPTPROV hProvider;"},
{"lineNum":"   99","line":"    int ret = CryptAcquireContextW(&hProvider, NULL, NULL, PROV_RSA_FULL, CRYPT_VERIFYCONTEXT);"},
{"lineNum":"  100","line":"    if (!ret) {"},
{"lineNum":"  101","line":"        RandFailure();"},
{"lineNum":"  102","line":"    }"},
{"lineNum":"  103","line":"    ret = CryptGenRandom(hProvider, 32, ent32);"},
{"lineNum":"  104","line":"    if (!ret) {"},
{"lineNum":"  105","line":"        RandFailure();"},
{"lineNum":"  106","line":"    }"},
{"lineNum":"  107","line":"    CryptReleaseContext(hProvider, 0);"},
{"lineNum":"  108","line":"#else"},
{"lineNum":"  109","line":"    int f = open(\"/dev/urandom\", O_RDONLY);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"    if (f == -1) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"        RandFailure();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"    }"},
{"lineNum":"  113","line":"    int have = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"    do {"},
{"lineNum":"  115","line":"        ssize_t n = read(f, ent32 + have, 32 - have);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"        if (n <= 0 || n + have > 32) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"            RandFailure();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"        }"},
{"lineNum":"  119","line":"        have += n;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":"    } while (have < 32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"    close(f);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":"#endif"},
{"lineNum":"  123","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"void GetRandBytes(unsigned char* buf, int num)"},
{"lineNum":"  126","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  127","line":"    if (RAND_bytes(buf, num) != 1) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":"        RandFailure();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  129","line":"    }"},
{"lineNum":"  130","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"void GetStrongRandBytes(unsigned char* out, int num)"},
{"lineNum":"  133","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  134","line":"    assert(num <= 32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    CSHA512 hasher;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"    unsigned char buf[64];"},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    // First source: OpenSSL\'s RNG"},
{"lineNum":"  139","line":"    RandAddSeedPerfmon();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":"    GetRandBytes(buf, 32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":"    hasher.Write(buf, 32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  142","line":""},
{"lineNum":"  143","line":"    // Second source: OS RNG"},
{"lineNum":"  144","line":"    GetOSRand(buf);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"    hasher.Write(buf, 32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"    // Produce output"},
{"lineNum":"  148","line":"    hasher.Finalize(buf);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":"    memcpy(out, buf, num);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"    memory_cleanse(buf, 64);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"uint64_t GetRand(uint64_t nMax)"},
{"lineNum":"  154","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  155","line":"    if (nMax == 0)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"    // The range of the random source must be a multiple of the modulus"},
{"lineNum":"  159","line":"    // to give every possible output value an equal possibility"},
{"lineNum":"  160","line":"    uint64_t nRange = (std::numeric_limits<uint64_t>::max() / nMax) * nMax;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  161","line":"    uint64_t nRand = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"    do {"},
{"lineNum":"  163","line":"        GetRandBytes((unsigned char*)&nRand, sizeof(nRand));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  164","line":"    } while (nRand >= nRange);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":"    return (nRand % nMax);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"int GetRandInt(int nMax)"},
{"lineNum":"  169","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  170","line":"    return GetRand(nMax);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  171","line":"}"},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"uint256 GetRandHash()"},
{"lineNum":"  174","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  175","line":"    uint256 hash;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"    GetRandBytes((unsigned char*)&hash, sizeof(hash));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  177","line":"    return hash;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  178","line":"}"},
{"lineNum":"  179","line":""},
{"lineNum":"  180","line":"bool GetRandBool(double rate)"},
{"lineNum":"  181","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  182","line":"    if (rate == 0.0) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":"        return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  184","line":"    }"},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    const uint64_t v = 100000000;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"    uint64_t r = GetRand(v + 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":"    return r <= v * rate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"void FastRandomContext::RandomSeed()"},
{"lineNum":"  192","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  193","line":"    uint256 seed = GetRandHash();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":"    rng.SetKey(seed.begin(), 32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  195","line":"    requires_seed = false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"FastRandomContext::FastRandomContext(const uint256& seed) : requires_seed(false), bytebuf_size(0), bitbuf_size(0)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  199","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  200","line":"    rng.SetKey(seed.begin(), 32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  201","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"bool Random_SanityCheck()"},
{"lineNum":"  204","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  205","line":"    /* This does not measure the quality of randomness, but it does test that"},
{"lineNum":"  206","line":"     * OSRandom() overwrites all 32 bytes of the output given a maximum"},
{"lineNum":"  207","line":"     * number of tries."},
{"lineNum":"  208","line":"     */"},
{"lineNum":"  209","line":"    static const ssize_t MAX_TRIES = 1024;"},
{"lineNum":"  210","line":"    uint8_t data[NUM_OS_RANDOM_BYTES];"},
{"lineNum":"  211","line":"    bool overwritten[NUM_OS_RANDOM_BYTES] = {}; /* Tracks which bytes have been overwritten at least once */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  212","line":"    int num_overwritten;"},
{"lineNum":"  213","line":"    int tries = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"    /* Loop until all bytes have been overwritten at least once, or max number tries reached */"},
{"lineNum":"  215","line":"    do {"},
{"lineNum":"  216","line":"        memset(data, 0, NUM_OS_RANDOM_BYTES);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"        GetOSRand(data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  218","line":"        for (int x=0; x < NUM_OS_RANDOM_BYTES; ++x) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  219","line":"            overwritten[x] |= (data[x] != 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":"        }"},
{"lineNum":"  221","line":""},
{"lineNum":"  222","line":"        num_overwritten = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  223","line":"        for (int x=0; x < NUM_OS_RANDOM_BYTES; ++x) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  224","line":"            if (overwritten[x]) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  225","line":"                num_overwritten += 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  226","line":"            }"},
{"lineNum":"  227","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  228","line":""},
{"lineNum":"  229","line":"        tries += 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  230","line":"    } while (num_overwritten < NUM_OS_RANDOM_BYTES && tries < MAX_TRIES);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  231","line":"    return (num_overwritten == NUM_OS_RANDOM_BYTES); /* If this failed, bailed out after too many tries */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  232","line":"}"},
{"lineNum":"  233","line":""},
{"lineNum":"  234","line":"FastRandomContext::FastRandomContext(bool fDeterministic) : requires_seed(!fDeterministic), bytebuf_size(0), bitbuf_size(0)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  235","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  236","line":"    if (!fDeterministic) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  237","line":"        return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  238","line":"    }"},
{"lineNum":"  239","line":"    uint256 seed;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  240","line":"    rng.SetKey(seed.begin(), 32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  241","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "grootle_fuzz_debug", "date" : "2023-08-17 10:19:04", "instrumented" : 98, "covered" : 10,};
var merged_data = [];
