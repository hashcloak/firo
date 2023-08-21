var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2017 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"// Based on the public domain implementation \'merged\' by D. J. Bernstein"},
{"lineNum":"    6","line":"// See https://cr.yp.to/chacha.html."},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#include <crypto/common.h>"},
{"lineNum":"    9","line":"#include <crypto/chacha20.h>"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"#include <string.h>"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"constexpr static inline uint32_t rotl32(uint32_t v, int c) { return (v << c) | (v >> (32 - c)); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"#define QUARTERROUND(a,b,c,d) \\"},
{"lineNum":"   16","line":"  a += b; d = rotl32(d ^ a, 16); \\"},
{"lineNum":"   17","line":"  c += d; b = rotl32(b ^ c, 12); \\"},
{"lineNum":"   18","line":"  a += b; d = rotl32(d ^ a, 8); \\"},
{"lineNum":"   19","line":"  c += d; b = rotl32(b ^ c, 7);"},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"static const unsigned char sigma[] = \"expand 32-byte k\";"},
{"lineNum":"   22","line":"static const unsigned char tau[] = \"expand 16-byte k\";"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"void ChaCha20::SetKey(const unsigned char* k, size_t keylen)"},
{"lineNum":"   25","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   26","line":"    const unsigned char *constants;"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    input[4] = ReadLE32(k + 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"    input[5] = ReadLE32(k + 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    input[6] = ReadLE32(k + 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"    input[7] = ReadLE32(k + 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"    if (keylen == 32) { /* recommended */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"        k += 16;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"        constants = sigma;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   35","line":"    } else { /* keylen == 16 */","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"        constants = tau;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"    }"},
{"lineNum":"   38","line":"    input[8] = ReadLE32(k + 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"    input[9] = ReadLE32(k + 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    input[10] = ReadLE32(k + 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"    input[11] = ReadLE32(k + 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"    input[0] = ReadLE32(constants + 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    input[1] = ReadLE32(constants + 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"    input[2] = ReadLE32(constants + 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"    input[3] = ReadLE32(constants + 12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"    input[12] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    input[13] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"    input[14] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"    input[15] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"ChaCha20::ChaCha20()"},
{"lineNum":"   53","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":"    memset(input, 0, sizeof(input));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"ChaCha20::ChaCha20(const unsigned char* k, size_t keylen)"},
{"lineNum":"   58","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   59","line":"    SetKey(k, keylen);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"void ChaCha20::SetIV(uint64_t iv)"},
{"lineNum":"   63","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   64","line":"    input[14] = iv;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"    input[15] = iv >> 32;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"void ChaCha20::Seek(uint64_t pos)"},
{"lineNum":"   69","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":"    input[12] = pos;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    input[13] = pos >> 32;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"void ChaCha20::Output(unsigned char* c, size_t bytes)"},
{"lineNum":"   75","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   76","line":"    uint32_t x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15;"},
{"lineNum":"   77","line":"    uint32_t j0, j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12, j13, j14, j15;"},
{"lineNum":"   78","line":"    unsigned char *ctarget = nullptr;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"    unsigned char tmp[64];"},
{"lineNum":"   80","line":"    unsigned int i;"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    if (!bytes) return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"    j0 = input[0];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"    j1 = input[1];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"    j2 = input[2];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"    j3 = input[3];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":"    j4 = input[4];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   89","line":"    j5 = input[5];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"    j6 = input[6];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":"    j7 = input[7];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"    j8 = input[8];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":"    j9 = input[9];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":"    j10 = input[10];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    j11 = input[11];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"    j12 = input[12];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"    j13 = input[13];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    j14 = input[14];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"    j15 = input[15];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    for (;;) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":"        if (bytes < 64) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":"            ctarget = c;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"            c = tmp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"        }"},
{"lineNum":"  106","line":"        x0 = j0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"        x1 = j1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":"        x2 = j2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"        x3 = j3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"        x4 = j4;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"        x5 = j5;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"        x6 = j6;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":"        x7 = j7;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"        x8 = j8;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"        x9 = j9;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"        x10 = j10;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"        x11 = j11;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"        x12 = j12;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":"        x13 = j13;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":"        x14 = j14;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"        x15 = j15;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":"        for (i = 20;i > 0;i -= 2) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  123","line":"            QUARTERROUND( x0, x4, x8,x12)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"            QUARTERROUND( x1, x5, x9,x13)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"            QUARTERROUND( x2, x6,x10,x14)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":"            QUARTERROUND( x3, x7,x11,x15)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"            QUARTERROUND( x0, x5,x10,x15)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":"            QUARTERROUND( x1, x6,x11,x12)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  129","line":"            QUARTERROUND( x2, x7, x8,x13)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  130","line":"            QUARTERROUND( x3, x4, x9,x14)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"        }"},
{"lineNum":"  132","line":"        x0 += j0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":"        x1 += j1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"        x2 += j2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"        x3 += j3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"        x4 += j4;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"        x5 += j5;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":"        x6 += j6;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"        x7 += j7;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":"        x8 += j8;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":"        x9 += j9;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  142","line":"        x10 += j10;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  143","line":"        x11 += j11;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"        x12 += j12;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"        x13 += j13;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"        x14 += j14;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"        x15 += j15;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"        ++j12;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"        if (!j12) ++j13;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"        WriteLE32(c + 0, x0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  153","line":"        WriteLE32(c + 4, x1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  154","line":"        WriteLE32(c + 8, x2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  155","line":"        WriteLE32(c + 12, x3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":"        WriteLE32(c + 16, x4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"        WriteLE32(c + 20, x5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"        WriteLE32(c + 24, x6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  159","line":"        WriteLE32(c + 28, x7);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":"        WriteLE32(c + 32, x8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  161","line":"        WriteLE32(c + 36, x9);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"        WriteLE32(c + 40, x10);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  163","line":"        WriteLE32(c + 44, x11);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  164","line":"        WriteLE32(c + 48, x12);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":"        WriteLE32(c + 52, x13);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"        WriteLE32(c + 56, x14);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  167","line":"        WriteLE32(c + 60, x15);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"        if (bytes <= 64) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":"            if (bytes < 64) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  171","line":"                for (i = 0;i < bytes;++i) ctarget[i] = c[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":"            }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  173","line":"            input[12] = j12;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  174","line":"            input[13] = j13;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"            return;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"        }"},
{"lineNum":"  177","line":"        bytes -= 64;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":"        c += 64;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  179","line":"    }"},
{"lineNum":"  180","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bpplus_hfuzz_debug", "date" : "2023-08-17 17:25:25", "instrumented" : 130, "covered" : 0,};
var merged_data = [];
