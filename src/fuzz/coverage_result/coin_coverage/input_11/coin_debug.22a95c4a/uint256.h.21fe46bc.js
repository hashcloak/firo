var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2009-2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2016 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#ifndef BITCOIN_UINT256_H"},
{"lineNum":"    7","line":"#define BITCOIN_UINT256_H"},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"#include <assert.h>"},
{"lineNum":"   10","line":"#include <cstring>"},
{"lineNum":"   11","line":"#include <functional>"},
{"lineNum":"   12","line":"#include <stdexcept>"},
{"lineNum":"   13","line":"#include <stdint.h>"},
{"lineNum":"   14","line":"#include <string>"},
{"lineNum":"   15","line":"#include <vector>"},
{"lineNum":"   16","line":"#include <array>"},
{"lineNum":"   17","line":"#include \"crypto/common.h\""},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"/** Template base class for fixed-sized opaque blobs. */"},
{"lineNum":"   20","line":"template<unsigned int BITS>"},
{"lineNum":"   21","line":"class base_blob"},
{"lineNum":"   22","line":"{"},
{"lineNum":"   23","line":"protected:"},
{"lineNum":"   24","line":"    enum { WIDTH=BITS/8 };"},
{"lineNum":"   25","line":"    uint8_t data[WIDTH];"},
{"lineNum":"   26","line":"public:"},
{"lineNum":"   27","line":"    base_blob()"},
{"lineNum":"   28","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   29","line":"        memset(data, 0, sizeof(data));","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   30","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    explicit base_blob(const std::vector<unsigned char>& vch);"},
{"lineNum":"   33","line":"    explicit base_blob(const std::array<unsigned char, WIDTH>& vch);"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    bool IsNull() const"},
{"lineNum":"   36","line":"    {"},
{"lineNum":"   37","line":"        for (int i = 0; i < WIDTH; i++)"},
{"lineNum":"   38","line":"            if (data[i] != 0)"},
{"lineNum":"   39","line":"                return false;"},
{"lineNum":"   40","line":"        return true;"},
{"lineNum":"   41","line":"    }"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    void SetNull()"},
{"lineNum":"   44","line":"    {"},
{"lineNum":"   45","line":"        memset(data, 0, sizeof(data));"},
{"lineNum":"   46","line":"    }"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    inline int Compare(const base_blob& other) const { return memcmp(data, other.data, sizeof(data)); }"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    friend inline bool operator==(const base_blob& a, const base_blob& b) { return a.Compare(b) == 0; }"},
{"lineNum":"   51","line":"    friend inline bool operator!=(const base_blob& a, const base_blob& b) { return a.Compare(b) != 0; }"},
{"lineNum":"   52","line":"    friend inline bool operator<(const base_blob& a, const base_blob& b) { return a.Compare(b) < 0; }"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    std::string GetHex() const;"},
{"lineNum":"   55","line":"    void SetHex(const char* psz);"},
{"lineNum":"   56","line":"    void SetHex(const std::string& str);"},
{"lineNum":"   57","line":"    std::string ToString() const;"},
{"lineNum":"   58","line":"    base_blob<BITS> uintS(const char *str) const;"},
{"lineNum":"   59","line":"    base_blob<BITS> uintS(const std::string& str) const;"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    unsigned char* begin()"},
{"lineNum":"   62","line":"    {"},
{"lineNum":"   63","line":"        return &data[0];"},
{"lineNum":"   64","line":"    }"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    unsigned char* end()"},
{"lineNum":"   67","line":"    {"},
{"lineNum":"   68","line":"        return &data[WIDTH];"},
{"lineNum":"   69","line":"    }"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    const unsigned char* begin() const"},
{"lineNum":"   72","line":"    {"},
{"lineNum":"   73","line":"        return &data[0];"},
{"lineNum":"   74","line":"    }"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    const unsigned char* end() const"},
{"lineNum":"   77","line":"    {"},
{"lineNum":"   78","line":"        return &data[WIDTH];"},
{"lineNum":"   79","line":"    }"},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    unsigned int size() const"},
{"lineNum":"   82","line":"    {"},
{"lineNum":"   83","line":"        return sizeof(data);"},
{"lineNum":"   84","line":"    }"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    uint64_t GetUint64(int pos) const"},
{"lineNum":"   87","line":"    {"},
{"lineNum":"   88","line":"        const uint8_t* ptr = data + pos * 8;"},
{"lineNum":"   89","line":"        return ((uint64_t)ptr[0]) | \\"},
{"lineNum":"   90","line":"               ((uint64_t)ptr[1]) << 8 | \\"},
{"lineNum":"   91","line":"               ((uint64_t)ptr[2]) << 16 | \\"},
{"lineNum":"   92","line":"               ((uint64_t)ptr[3]) << 24 | \\"},
{"lineNum":"   93","line":"               ((uint64_t)ptr[4]) << 32 | \\"},
{"lineNum":"   94","line":"               ((uint64_t)ptr[5]) << 40 | \\"},
{"lineNum":"   95","line":"               ((uint64_t)ptr[6]) << 48 | \\"},
{"lineNum":"   96","line":"               ((uint64_t)ptr[7]) << 56;"},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"    uint32_t GetFirstUint32() const"},
{"lineNum":"  100","line":"    {"},
{"lineNum":"  101","line":"        const uint8_t* ptr = data;"},
{"lineNum":"  102","line":"        return ((uint32_t)ptr[0]) | \\"},
{"lineNum":"  103","line":"               ((uint32_t)ptr[1]) << 8 | \\"},
{"lineNum":"  104","line":"               ((uint32_t)ptr[2]) << 16 | \\"},
{"lineNum":"  105","line":"               ((uint32_t)ptr[3]) << 24;"},
{"lineNum":"  106","line":"    }"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"    template<typename Stream>"},
{"lineNum":"  109","line":"    void Serialize(Stream& s) const"},
{"lineNum":"  110","line":"    {"},
{"lineNum":"  111","line":"        s.write((char*)data, sizeof(data));"},
{"lineNum":"  112","line":"    }"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    template<typename Stream>"},
{"lineNum":"  115","line":"    void Unserialize(Stream& s)"},
{"lineNum":"  116","line":"    {"},
{"lineNum":"  117","line":"        s.read((char*)data, sizeof(data));"},
{"lineNum":"  118","line":"    }"},
{"lineNum":"  119","line":"};"},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"/** 160-bit opaque blob."},
{"lineNum":"  122","line":" * @note This type is called uint160 for historical reasons only. It is an opaque"},
{"lineNum":"  123","line":" * blob of 160 bits and has no integer operations."},
{"lineNum":"  124","line":" */"},
{"lineNum":"  125","line":"class uint160 : public base_blob<160> {"},
{"lineNum":"  126","line":"public:"},
{"lineNum":"  127","line":"    uint160() {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  128","line":"    uint160(const base_blob<160>& b) : base_blob<160>(b) {}"},
{"lineNum":"  129","line":"    explicit uint160(const std::vector<unsigned char>& vch) : base_blob<160>(vch) {}"},
{"lineNum":"  130","line":"};"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"/** 256-bit opaque blob."},
{"lineNum":"  133","line":" * @note This type is called uint256 for historical reasons only. It is an"},
{"lineNum":"  134","line":" * opaque blob of 256 bits and has no integer operations. Use arith_uint256 if"},
{"lineNum":"  135","line":" * those are required."},
{"lineNum":"  136","line":" */"},
{"lineNum":"  137","line":"class uint256 : public base_blob<256> {"},
{"lineNum":"  138","line":"public:"},
{"lineNum":"  139","line":"    uint256() {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  140","line":"    uint256(const base_blob<256>& b) : base_blob<256>(b) {}"},
{"lineNum":"  141","line":"    explicit uint256(const std::vector<unsigned char>& vch) : base_blob<256>(vch) {}"},
{"lineNum":"  142","line":""},
{"lineNum":"  143","line":"    /** A cheap hash function that just returns 64 bits from the result, it can be"},
{"lineNum":"  144","line":"     * used when the contents are considered uniformly random. It is not appropriate"},
{"lineNum":"  145","line":"     * when the value can easily be influenced from outside as e.g. a network adversary could"},
{"lineNum":"  146","line":"     * provide values to trigger worst-case behavior."},
{"lineNum":"  147","line":"     */"},
{"lineNum":"  148","line":"    uint64_t GetCheapHash() const"},
{"lineNum":"  149","line":"    {"},
{"lineNum":"  150","line":"        return ReadLE64(data);"},
{"lineNum":"  151","line":"    }"},
{"lineNum":"  152","line":"};"},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"/* uint256 from const char *."},
{"lineNum":"  155","line":" * This is a separate function because the constructor uint256(const char*) can result"},
{"lineNum":"  156","line":" * in dangerously catching uint256(0)."},
{"lineNum":"  157","line":" */"},
{"lineNum":"  158","line":"inline uint256 uint256S(const char *str)"},
{"lineNum":"  159","line":"{"},
{"lineNum":"  160","line":"    uint256 rv;"},
{"lineNum":"  161","line":"    rv.SetHex(str);"},
{"lineNum":"  162","line":"    return rv;"},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":"/* uint256 from std::string."},
{"lineNum":"  165","line":" * This is a separate function because the constructor uint256(const std::string &str) can result"},
{"lineNum":"  166","line":" * in dangerously catching uint256(0) via std::string(const char*)."},
{"lineNum":"  167","line":" */"},
{"lineNum":"  168","line":"inline uint256 uint256S(const std::string& str)"},
{"lineNum":"  169","line":"{"},
{"lineNum":"  170","line":"    uint256 rv;"},
{"lineNum":"  171","line":"    rv.SetHex(str);"},
{"lineNum":"  172","line":"    return rv;"},
{"lineNum":"  173","line":"}"},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"/** 512-bit opaque blob."},
{"lineNum":"  176","line":" * @note This type is called uint512 for historical reasons only. It is an"},
{"lineNum":"  177","line":" * opaque blob of 512 bits and has no integer operations. Use arith_uint512 if"},
{"lineNum":"  178","line":" * those are required."},
{"lineNum":"  179","line":" */"},
{"lineNum":"  180","line":"class uint512 : public base_blob<512> {"},
{"lineNum":"  181","line":"public:"},
{"lineNum":"  182","line":"    uint512() {}"},
{"lineNum":"  183","line":"    uint512(const base_blob<512>& b) : base_blob<512>(b) {}"},
{"lineNum":"  184","line":"    explicit uint512(const std::vector<unsigned char>& vch) : base_blob<512>(vch) {}"},
{"lineNum":"  185","line":"    explicit uint512(const std::array<unsigned char, 64>& vch) : base_blob<512>(vch) {}"},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"     /** A cheap hash function that just returns 64 bits from the result, it can be"},
{"lineNum":"  188","line":"     * used when the contents are considered uniformly random. It is not appropriate"},
{"lineNum":"  189","line":"     * when the value can easily be influenced from outside as e.g. a network adversary could"},
{"lineNum":"  190","line":"     * provide values to trigger worst-case behavior."},
{"lineNum":"  191","line":"     */"},
{"lineNum":"  192","line":"    uint64_t GetCheapHash() const"},
{"lineNum":"  193","line":"    {"},
{"lineNum":"  194","line":"        return ReadLE64(data);"},
{"lineNum":"  195","line":"    }"},
{"lineNum":"  196","line":""},
{"lineNum":"  197","line":"     uint256 trim256() const"},
{"lineNum":"  198","line":"    {"},
{"lineNum":"  199","line":"        uint256 ret;"},
{"lineNum":"  200","line":"        memcpy(ret.begin(), (*this).begin(), ret.size());"},
{"lineNum":"  201","line":"        return ret;"},
{"lineNum":"  202","line":"    }"},
{"lineNum":"  203","line":"};"},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"namespace std {"},
{"lineNum":"  206","line":""},
{"lineNum":"  207","line":"template<unsigned Size>"},
{"lineNum":"  208","line":"struct hash<base_blob<Size>>"},
{"lineNum":"  209","line":"{"},
{"lineNum":"  210","line":"    size_t operator()(const base_blob<Size>& b) const"},
{"lineNum":"  211","line":"    {"},
{"lineNum":"  212","line":"        return hash<string>()(string(b.begin(), b.end()));"},
{"lineNum":"  213","line":"    }"},
{"lineNum":"  214","line":"};"},
{"lineNum":"  215","line":""},
{"lineNum":"  216","line":"template<>"},
{"lineNum":"  217","line":"struct hash<uint256> : hash<base_blob<256>>"},
{"lineNum":"  218","line":"{"},
{"lineNum":"  219","line":"};"},
{"lineNum":"  220","line":""},
{"lineNum":"  221","line":"template<>"},
{"lineNum":"  222","line":"struct hash<uint160> : hash<base_blob<160>>"},
{"lineNum":"  223","line":"{"},
{"lineNum":"  224","line":"};"},
{"lineNum":"  225","line":""},
{"lineNum":"  226","line":"} // namespace std"},
{"lineNum":"  227","line":""},
{"lineNum":"  228","line":"#endif // BITCOIN_UINT256_H"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug", "date" : "2023-08-28 08:52:56", "instrumented" : 5, "covered" : 0,};
var merged_data = [];
