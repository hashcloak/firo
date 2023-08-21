var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2009-2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2016 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#ifndef BITCOIN_HASH_H"},
{"lineNum":"    7","line":"#define BITCOIN_HASH_H"},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"#include \"crypto/ripemd160.h\""},
{"lineNum":"   10","line":"#include \"crypto/sha256.h\""},
{"lineNum":"   11","line":"#include \"crypto/sha512.h\""},
{"lineNum":"   12","line":"#include \"prevector.h\""},
{"lineNum":"   13","line":"#include \"serialize.h\""},
{"lineNum":"   14","line":"#include \"uint256.h\""},
{"lineNum":"   15","line":"#include \"arith_uint256.h\""},
{"lineNum":"   16","line":"#include \"version.h\""},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"#include <vector>"},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"typedef uint256 ChainCode;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"/** A hasher class for Bitcoin\'s 256-bit hash (double SHA-256). */"},
{"lineNum":"   23","line":"class CHash256 {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   24","line":"private:"},
{"lineNum":"   25","line":"    CSHA256 sha;"},
{"lineNum":"   26","line":"public:"},
{"lineNum":"   27","line":"    static const size_t OUTPUT_SIZE = CSHA256::OUTPUT_SIZE;"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    void Finalize(unsigned char hash[OUTPUT_SIZE]) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   30","line":"        unsigned char buf[CSHA256::OUTPUT_SIZE];"},
{"lineNum":"   31","line":"        sha.Finalize(buf);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"        sha.Reset().Write(buf, CSHA256::OUTPUT_SIZE).Finalize(hash);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    CHash256& Write(const unsigned char *data, size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":"        sha.Write(data, len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"        return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    CHash256& Reset() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   41","line":"        sha.Reset();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"        return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"    }"},
{"lineNum":"   44","line":"};"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"/** A hasher class for Bitcoin\'s 160-bit hash (SHA-256 + RIPEMD-160). */"},
{"lineNum":"   47","line":"class CHash160 {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   48","line":"private:"},
{"lineNum":"   49","line":"    CSHA256 sha;"},
{"lineNum":"   50","line":"public:"},
{"lineNum":"   51","line":"    static const size_t OUTPUT_SIZE = CRIPEMD160::OUTPUT_SIZE;"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    void Finalize(unsigned char hash[OUTPUT_SIZE]) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":"        unsigned char buf[CSHA256::OUTPUT_SIZE];"},
{"lineNum":"   55","line":"        sha.Finalize(buf);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"        CRIPEMD160().Write(buf, CSHA256::OUTPUT_SIZE).Finalize(hash);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    CHash160& Write(const unsigned char *data, size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"        sha.Write(data, len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"        return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   62","line":"    }"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    CHash160& Reset() {"},
{"lineNum":"   65","line":"        sha.Reset();"},
{"lineNum":"   66","line":"        return *this;"},
{"lineNum":"   67","line":"    }"},
{"lineNum":"   68","line":"};"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"class CHash512"},
{"lineNum":"   71","line":"{"},
{"lineNum":"   72","line":"private:"},
{"lineNum":"   73","line":"    CSHA512 sha;"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":" public:"},
{"lineNum":"   76","line":"    static const size_t OUTPUT_SIZE = CSHA512::OUTPUT_SIZE;"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"     void Finalize(unsigned char hash[OUTPUT_SIZE])"},
{"lineNum":"   79","line":"    {"},
{"lineNum":"   80","line":"        unsigned char buf[CSHA512::OUTPUT_SIZE];"},
{"lineNum":"   81","line":"        sha.Finalize(buf);"},
{"lineNum":"   82","line":"        sha.Reset().Write(buf, CSHA512::OUTPUT_SIZE).Finalize(hash);"},
{"lineNum":"   83","line":"    }"},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"     CHash512& Write(const unsigned char* data, size_t len)"},
{"lineNum":"   86","line":"    {"},
{"lineNum":"   87","line":"        sha.Write(data, len);"},
{"lineNum":"   88","line":"        return *this;"},
{"lineNum":"   89","line":"    }"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"     CHash512& Reset()"},
{"lineNum":"   92","line":"    {"},
{"lineNum":"   93","line":"        sha.Reset();"},
{"lineNum":"   94","line":"        return *this;"},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":"};"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":" /** Compute the 512-bit hash of an object. */"},
{"lineNum":"  100","line":"template <typename T1>"},
{"lineNum":"  101","line":"inline uint512 Hash512(const T1 pbegin, const T1 pend)"},
{"lineNum":"  102","line":"{"},
{"lineNum":"  103","line":"    static const unsigned char pblank[1] = {};"},
{"lineNum":"  104","line":"    uint512 result;"},
{"lineNum":"  105","line":"    CHash512().Write(pbegin == pend ? pblank : (const unsigned char*)&pbegin[0], (pend - pbegin) * sizeof(pbegin[0])).Finalize((unsigned char*)&result);"},
{"lineNum":"  106","line":"    return result;"},
{"lineNum":"  107","line":"}"},
{"lineNum":"  108","line":"template <typename T1, typename T2>"},
{"lineNum":"  109","line":"inline uint512 Hash512(const T1 p1begin, const T1 p1end, const T2 p2begin, const T2 p2end)"},
{"lineNum":"  110","line":"{"},
{"lineNum":"  111","line":"    static const unsigned char pblank[1] = {};"},
{"lineNum":"  112","line":"    uint512 result;"},
{"lineNum":"  113","line":"    CHash512().Write(p1begin == p1end ? pblank : (const unsigned char*)&p1begin[0], (p1end - p1begin) * sizeof(p1begin[0])).Write(p2begin == p2end ? pblank : (const unsigned char*)&p2begin[0], (p2end - p2begin) * sizeof(p2begin[0])).Finalize((unsigned char*)&result);"},
{"lineNum":"  114","line":"    return result;"},
{"lineNum":"  115","line":"}"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"/** Compute the 256-bit hash of an object. */"},
{"lineNum":"  118","line":"template<typename T1>"},
{"lineNum":"  119","line":"inline uint256 Hash(const T1 pbegin, const T1 pend)"},
{"lineNum":"  120","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  121","line":"    static const unsigned char pblank[1] = {};"},
{"lineNum":"  122","line":"    uint256 result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    CHash256().Write(pbegin == pend ? pblank : (const unsigned char*)&pbegin[0], (pend - pbegin) * sizeof(pbegin[0]))","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"              .Finalize((unsigned char*)&result);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"    return result;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  126","line":"}"},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"/** Compute the 256-bit hash of the concatenation of two objects. */"},
{"lineNum":"  129","line":"template<typename T1, typename T2>"},
{"lineNum":"  130","line":"inline uint256 Hash(const T1 p1begin, const T1 p1end,"},
{"lineNum":"  131","line":"                    const T2 p2begin, const T2 p2end) {"},
{"lineNum":"  132","line":"    static const unsigned char pblank[1] = {};"},
{"lineNum":"  133","line":"    uint256 result;"},
{"lineNum":"  134","line":"    CHash256().Write(p1begin == p1end ? pblank : (const unsigned char*)&p1begin[0], (p1end - p1begin) * sizeof(p1begin[0]))"},
{"lineNum":"  135","line":"              .Write(p2begin == p2end ? pblank : (const unsigned char*)&p2begin[0], (p2end - p2begin) * sizeof(p2begin[0]))"},
{"lineNum":"  136","line":"              .Finalize((unsigned char*)&result);"},
{"lineNum":"  137","line":"    return result;"},
{"lineNum":"  138","line":"}"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"/** Compute the 256-bit hash of the concatenation of three objects. */"},
{"lineNum":"  141","line":"template<typename T1, typename T2, typename T3>"},
{"lineNum":"  142","line":"inline uint256 Hash(const T1 p1begin, const T1 p1end,"},
{"lineNum":"  143","line":"                    const T2 p2begin, const T2 p2end,"},
{"lineNum":"  144","line":"                    const T3 p3begin, const T3 p3end) {"},
{"lineNum":"  145","line":"    static const unsigned char pblank[1] = {};"},
{"lineNum":"  146","line":"    uint256 result;"},
{"lineNum":"  147","line":"    CHash256().Write(p1begin == p1end ? pblank : (const unsigned char*)&p1begin[0], (p1end - p1begin) * sizeof(p1begin[0]))"},
{"lineNum":"  148","line":"              .Write(p2begin == p2end ? pblank : (const unsigned char*)&p2begin[0], (p2end - p2begin) * sizeof(p2begin[0]))"},
{"lineNum":"  149","line":"              .Write(p3begin == p3end ? pblank : (const unsigned char*)&p3begin[0], (p3end - p3begin) * sizeof(p3begin[0]))"},
{"lineNum":"  150","line":"              .Finalize((unsigned char*)&result);"},
{"lineNum":"  151","line":"    return result;"},
{"lineNum":"  152","line":"}"},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"/** Compute the 160-bit hash an object. */"},
{"lineNum":"  155","line":"template<typename T1>"},
{"lineNum":"  156","line":"inline uint160 Hash160(const T1 pbegin, const T1 pend)"},
{"lineNum":"  157","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  158","line":"    static unsigned char pblank[1] = {};"},
{"lineNum":"  159","line":"    uint160 result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":"    CHash160().Write(pbegin == pend ? pblank : (const unsigned char*)&pbegin[0], (pend - pbegin) * sizeof(pbegin[0]))","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  161","line":"              .Finalize((unsigned char*)&result);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"    return result;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"/** Compute the 160-bit hash of a vector. */"},
{"lineNum":"  166","line":"inline uint160 Hash160(const std::vector<unsigned char>& vch)"},
{"lineNum":"  167","line":"{"},
{"lineNum":"  168","line":"    return Hash160(vch.begin(), vch.end());"},
{"lineNum":"  169","line":"}"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"/** Compute the 160-bit hash of a vector. */"},
{"lineNum":"  172","line":"template<unsigned int N>"},
{"lineNum":"  173","line":"inline uint160 Hash160(const prevector<N, unsigned char>& vch)"},
{"lineNum":"  174","line":"{"},
{"lineNum":"  175","line":"    return Hash160(vch.begin(), vch.end());"},
{"lineNum":"  176","line":"}"},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"/** A writer stream (for serialization) that computes a 256-bit hash. */"},
{"lineNum":"  179","line":"class CHashWriter"},
{"lineNum":"  180","line":"{"},
{"lineNum":"  181","line":"private:"},
{"lineNum":"  182","line":"    CHash256 ctx;"},
{"lineNum":"  183","line":""},
{"lineNum":"  184","line":"    const int nType;"},
{"lineNum":"  185","line":"    const int nVersion;"},
{"lineNum":"  186","line":"public:"},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"    CHashWriter(int nTypeIn, int nVersionIn) : nType(nTypeIn), nVersion(nVersionIn) {}"},
{"lineNum":"  189","line":""},
{"lineNum":"  190","line":"    int GetType() const { return nType; }"},
{"lineNum":"  191","line":"    int GetVersion() const { return nVersion; }"},
{"lineNum":"  192","line":""},
{"lineNum":"  193","line":"    void write(const char *pch, size_t size) {"},
{"lineNum":"  194","line":"        ctx.Write((const unsigned char*)pch, size);"},
{"lineNum":"  195","line":"    }"},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"    // invalidates the object"},
{"lineNum":"  198","line":"    uint256 GetHash() {"},
{"lineNum":"  199","line":"        uint256 result;"},
{"lineNum":"  200","line":"        ctx.Finalize((unsigned char*)&result);"},
{"lineNum":"  201","line":"        return result;"},
{"lineNum":"  202","line":"    }"},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":"    arith_uint256 GetArith256Hash() {"},
{"lineNum":"  205","line":"        uint256 result;"},
{"lineNum":"  206","line":"        ctx.Finalize((unsigned char*)&result);"},
{"lineNum":"  207","line":"        return UintToArith256(result);"},
{"lineNum":"  208","line":"    }"},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"    template<typename T>"},
{"lineNum":"  211","line":"    CHashWriter& operator<<(const T& obj) {"},
{"lineNum":"  212","line":"        // Serialize to this stream"},
{"lineNum":"  213","line":"        ::Serialize(*this, obj);"},
{"lineNum":"  214","line":"        return (*this);"},
{"lineNum":"  215","line":"    }"},
{"lineNum":"  216","line":"};"},
{"lineNum":"  217","line":""},
{"lineNum":"  218","line":"/** Reads data from an underlying stream, while hashing the read data. */"},
{"lineNum":"  219","line":"template<typename Source>"},
{"lineNum":"  220","line":"class CHashVerifier : public CHashWriter"},
{"lineNum":"  221","line":"{"},
{"lineNum":"  222","line":"private:"},
{"lineNum":"  223","line":"    Source* source;"},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"public:"},
{"lineNum":"  226","line":"    CHashVerifier(Source* source_) : CHashWriter(source_->GetType(), source_->GetVersion()), source(source_) {}"},
{"lineNum":"  227","line":""},
{"lineNum":"  228","line":"    void read(char* pch, size_t nSize)"},
{"lineNum":"  229","line":"    {"},
{"lineNum":"  230","line":"        source->read(pch, nSize);"},
{"lineNum":"  231","line":"        this->write(pch, nSize);"},
{"lineNum":"  232","line":"    }"},
{"lineNum":"  233","line":""},
{"lineNum":"  234","line":"    void ignore(size_t nSize)"},
{"lineNum":"  235","line":"    {"},
{"lineNum":"  236","line":"        char data[1024];"},
{"lineNum":"  237","line":"        while (nSize > 0) {"},
{"lineNum":"  238","line":"            size_t now = std::min<size_t>(nSize, 1024);"},
{"lineNum":"  239","line":"            read(data, now);"},
{"lineNum":"  240","line":"            nSize -= now;"},
{"lineNum":"  241","line":"        }"},
{"lineNum":"  242","line":"    }"},
{"lineNum":"  243","line":""},
{"lineNum":"  244","line":"    template<typename T>"},
{"lineNum":"  245","line":"    CHashVerifier<Source>& operator>>(T& obj)"},
{"lineNum":"  246","line":"    {"},
{"lineNum":"  247","line":"        // Unserialize from this stream"},
{"lineNum":"  248","line":"        ::Unserialize(*this, obj);"},
{"lineNum":"  249","line":"        return (*this);"},
{"lineNum":"  250","line":"    }"},
{"lineNum":"  251","line":"};"},
{"lineNum":"  252","line":""},
{"lineNum":"  253","line":"/** Compute the 256-bit hash of an object\'s serialization. */"},
{"lineNum":"  254","line":"template<typename T>"},
{"lineNum":"  255","line":"uint256 SerializeHash(const T& obj, int nType=SER_GETHASH, int nVersion=PROTOCOL_VERSION)"},
{"lineNum":"  256","line":"{"},
{"lineNum":"  257","line":"    CHashWriter ss(nType, nVersion);"},
{"lineNum":"  258","line":"    ss << obj;"},
{"lineNum":"  259","line":"    return ss.GetHash();"},
{"lineNum":"  260","line":"}"},
{"lineNum":"  261","line":""},
{"lineNum":"  262","line":"unsigned int MurmurHash3(unsigned int nHashSeed, const std::vector<unsigned char>& vDataToHash);"},
{"lineNum":"  263","line":""},
{"lineNum":"  264","line":"void BIP32Hash(const ChainCode &chainCode, unsigned int nChild, unsigned char header, const unsigned char data[32], unsigned char output[64]);"},
{"lineNum":"  265","line":""},
{"lineNum":"  266","line":"/** SipHash-2-4 */"},
{"lineNum":"  267","line":"class CSipHasher"},
{"lineNum":"  268","line":"{"},
{"lineNum":"  269","line":"private:"},
{"lineNum":"  270","line":"    uint64_t v[4];"},
{"lineNum":"  271","line":"    uint64_t tmp;"},
{"lineNum":"  272","line":"    int count;"},
{"lineNum":"  273","line":""},
{"lineNum":"  274","line":"public:"},
{"lineNum":"  275","line":"    /** Construct a SipHash calculator initialized with 128-bit key (k0, k1) */"},
{"lineNum":"  276","line":"    CSipHasher(uint64_t k0, uint64_t k1);"},
{"lineNum":"  277","line":"    /** Hash a 64-bit integer worth of data"},
{"lineNum":"  278","line":"     *  It is treated as if this was the little-endian interpretation of 8 bytes."},
{"lineNum":"  279","line":"     *  This function can only be used when a multiple of 8 bytes have been written so far."},
{"lineNum":"  280","line":"     */"},
{"lineNum":"  281","line":"    CSipHasher& Write(uint64_t data);"},
{"lineNum":"  282","line":"    /** Hash arbitrary bytes. */"},
{"lineNum":"  283","line":"    CSipHasher& Write(const unsigned char* data, size_t size);"},
{"lineNum":"  284","line":"    /** Compute the 64-bit SipHash-2-4 of the data written so far. The object remains untouched. */"},
{"lineNum":"  285","line":"    uint64_t Finalize() const;"},
{"lineNum":"  286","line":"};"},
{"lineNum":"  287","line":""},
{"lineNum":"  288","line":"/** Optimized SipHash-2-4 implementation for uint256."},
{"lineNum":"  289","line":" *"},
{"lineNum":"  290","line":" *  It is identical to:"},
{"lineNum":"  291","line":" *    SipHasher(k0, k1)"},
{"lineNum":"  292","line":" *      .Write(val.GetUint64(0))"},
{"lineNum":"  293","line":" *      .Write(val.GetUint64(1))"},
{"lineNum":"  294","line":" *      .Write(val.GetUint64(2))"},
{"lineNum":"  295","line":" *      .Write(val.GetUint64(3))"},
{"lineNum":"  296","line":" *      .Finalize()"},
{"lineNum":"  297","line":" */"},
{"lineNum":"  298","line":"uint64_t SipHashUint256(uint64_t k0, uint64_t k1, const uint256& val);"},
{"lineNum":"  299","line":"uint64_t SipHashUint256Extra(uint64_t k0, uint64_t k1, const uint256& val, uint32_t extra);"},
{"lineNum":"  300","line":""},
{"lineNum":"  301","line":"#endif // BITCOIN_HASH_H"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_fuzz_debug", "date" : "2023-08-09 11:42:11", "instrumented" : 29, "covered" : 0,};
var merged_data = [];
