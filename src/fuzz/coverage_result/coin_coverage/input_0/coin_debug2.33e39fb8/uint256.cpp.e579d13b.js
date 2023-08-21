var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2009-2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2016 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#include \"uint256.h\""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#include \"utilstrencodings.h\""},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include <stdio.h>"},
{"lineNum":"   11","line":"#include <string.h>"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"template <unsigned int BITS>"},
{"lineNum":"   14","line":"base_blob<BITS>::base_blob(const std::vector<unsigned char>& vch)"},
{"lineNum":"   15","line":"{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   16","line":"    assert(vch.size() == sizeof(data));","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   17","line":"    memcpy(data, &vch[0], sizeof(data));","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   18","line":"}","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"template<unsigned int BITS>"},
{"lineNum":"   21","line":"base_blob<BITS>::base_blob(const std::array<unsigned char, WIDTH>& vch)"},
{"lineNum":"   22","line":"{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   23","line":"    memcpy(data, &vch[0], sizeof(data));","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   24","line":"}","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"template <unsigned int BITS>"},
{"lineNum":"   27","line":"std::string base_blob<BITS>::GetHex() const"},
{"lineNum":"   28","line":"{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   29","line":"    char psz[sizeof(data) * 2 + 1];"},
{"lineNum":"   30","line":"    for (unsigned int i = 0; i < sizeof(data); i++)","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   31","line":"        sprintf(psz + i * 2, \"%02x\", data[sizeof(data) - i - 1]);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   32","line":"    return std::string(psz, psz + sizeof(data) * 2);","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   33","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"template <unsigned int BITS>"},
{"lineNum":"   36","line":"void base_blob<BITS>::SetHex(const char* psz)"},
{"lineNum":"   37","line":"{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   38","line":"    memset(data, 0, sizeof(data));","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    // skip leading spaces"},
{"lineNum":"   41","line":"    while (isspace(*psz))","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   42","line":"        psz++;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    // skip 0x"},
{"lineNum":"   45","line":"    if (psz[0] == \'0\' && tolower(psz[1]) == \'x\')","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   46","line":"        psz += 2;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    // hex string to uint"},
{"lineNum":"   49","line":"    const char* pbegin = psz;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   50","line":"    while (::HexDigit(*psz) != -1)","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   51","line":"        psz++;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   52","line":"    psz--;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   53","line":"    unsigned char* p1 = (unsigned char*)data;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   54","line":"    unsigned char* pend = p1 + WIDTH;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   55","line":"    while (psz >= pbegin && p1 < pend) {","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   56","line":"        *p1 = ::HexDigit(*psz--);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   57","line":"        if (psz >= pbegin) {","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   58","line":"            *p1 |= ((unsigned char)::HexDigit(*psz--) << 4);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   59","line":"            p1++;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   60","line":"        }"},
{"lineNum":"   61","line":"    }"},
{"lineNum":"   62","line":"}","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"template <unsigned int BITS>"},
{"lineNum":"   65","line":"void base_blob<BITS>::SetHex(const std::string& str)"},
{"lineNum":"   66","line":"{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   67","line":"    SetHex(str.c_str());","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   68","line":"}","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"template <unsigned int BITS>"},
{"lineNum":"   71","line":"std::string base_blob<BITS>::ToString() const"},
{"lineNum":"   72","line":"{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   73","line":"    return (GetHex());","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   74","line":"}"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"/* base_blob<BITS> from const char *."},
{"lineNum":"   77","line":" * This is a separate function because the constructor base_blob<BITS>(const char*) can result"},
{"lineNum":"   78","line":" * in dangerously catching base_blob<BITS>(0)."},
{"lineNum":"   79","line":" */"},
{"lineNum":"   80","line":"template <unsigned int BITS>"},
{"lineNum":"   81","line":"base_blob<BITS> base_blob<BITS>::uintS(const char *str) const"},
{"lineNum":"   82","line":"{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   83","line":"    base_blob<BITS> rv;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   84","line":"    rv.SetHex(str);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   85","line":"    return rv;","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   86","line":"}"},
{"lineNum":"   87","line":"/* base_blob<BITS> from std::string."},
{"lineNum":"   88","line":" * This is a separate function because the constructor base_blob<BITS>(const std::string &str) can result"},
{"lineNum":"   89","line":" * in dangerously catching base_blob<BITS>(0) via std::string(const char*)."},
{"lineNum":"   90","line":" */"},
{"lineNum":"   91","line":"template <unsigned int BITS>"},
{"lineNum":"   92","line":"base_blob<BITS> base_blob<BITS>::uintS(const std::string& str) const"},
{"lineNum":"   93","line":"{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   94","line":"    base_blob<BITS> rv;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   95","line":"    rv.SetHex(str);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   96","line":"    return rv;","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   97","line":"}"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"// Explicit instantiations for base_blob<160>"},
{"lineNum":"  100","line":"template base_blob<160>::base_blob(const std::vector<unsigned char>&);"},
{"lineNum":"  101","line":"template base_blob<160>::base_blob(const std::array<unsigned char, 20>&);"},
{"lineNum":"  102","line":"template std::string base_blob<160>::GetHex() const;"},
{"lineNum":"  103","line":"template std::string base_blob<160>::ToString() const;"},
{"lineNum":"  104","line":"template base_blob<160> base_blob<160>::uintS(const char *str) const;"},
{"lineNum":"  105","line":"template base_blob<160> base_blob<160>::uintS(const std::string& str) const;"},
{"lineNum":"  106","line":"template void base_blob<160>::SetHex(const char*);"},
{"lineNum":"  107","line":"template void base_blob<160>::SetHex(const std::string&);"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"// Explicit instantiations for base_blob<256>"},
{"lineNum":"  110","line":"template base_blob<256>::base_blob(const std::vector<unsigned char>&);"},
{"lineNum":"  111","line":"template base_blob<256>::base_blob(const std::array<unsigned char, 32>&);"},
{"lineNum":"  112","line":"template std::string base_blob<256>::GetHex() const;"},
{"lineNum":"  113","line":"template std::string base_blob<256>::ToString() const;"},
{"lineNum":"  114","line":"template base_blob<256> base_blob<256>::uintS(const char *str) const;"},
{"lineNum":"  115","line":"template base_blob<256> base_blob<256>::uintS(const std::string& str) const;"},
{"lineNum":"  116","line":"template void base_blob<256>::SetHex(const char*);"},
{"lineNum":"  117","line":"template void base_blob<256>::SetHex(const std::string&);"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"// Explicit instantiations for base_blob<512>"},
{"lineNum":"  120","line":"template base_blob<512>::base_blob(const std::vector<unsigned char>&);"},
{"lineNum":"  121","line":"template base_blob<512>::base_blob(const std::array<unsigned char, 64>&);"},
{"lineNum":"  122","line":"template std::string base_blob<512>::GetHex() const;"},
{"lineNum":"  123","line":"template std::string base_blob<512>::ToString() const;"},
{"lineNum":"  124","line":"template base_blob<512> base_blob<512>::uintS(const char *str) const;"},
{"lineNum":"  125","line":"template base_blob<512> base_blob<512>::uintS(const std::string& str) const;"},
{"lineNum":"  126","line":"template void base_blob<512>::SetHex(const char*);"},
{"lineNum":"  127","line":"template void base_blob<512>::SetHex(const std::string&);"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug2", "date" : "2023-08-17 10:55:49", "instrumented" : 43, "covered" : 0,};
var merged_data = [];
