var data = {lines:[
{"lineNum":"    1","line":"/* Copyright (c) 2017, 2021 Pieter Wuille"},
{"lineNum":"    2","line":" *"},
{"lineNum":"    3","line":" * Permission is hereby granted, free of charge, to any person obtaining a copy"},
{"lineNum":"    4","line":" * of this software and associated documentation files (the \"Software\"), to deal"},
{"lineNum":"    5","line":" * in the Software without restriction, including without limitation the rights"},
{"lineNum":"    6","line":" * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell"},
{"lineNum":"    7","line":" * copies of the Software, and to permit persons to whom the Software is"},
{"lineNum":"    8","line":" * furnished to do so, subject to the following conditions:"},
{"lineNum":"    9","line":" *"},
{"lineNum":"   10","line":" * The above copyright notice and this permission notice shall be included in"},
{"lineNum":"   11","line":" * all copies or substantial portions of the Software."},
{"lineNum":"   12","line":" *"},
{"lineNum":"   13","line":" * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR"},
{"lineNum":"   14","line":" * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,"},
{"lineNum":"   15","line":" * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE"},
{"lineNum":"   16","line":" * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER"},
{"lineNum":"   17","line":" * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,"},
{"lineNum":"   18","line":" * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN"},
{"lineNum":"   19","line":" * THE SOFTWARE."},
{"lineNum":"   20","line":" */"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"// Copyright (c) 2017 Pieter Wuille"},
{"lineNum":"   23","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"   24","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"#include \"bech32.h\""},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"#include <tuple>"},
{"lineNum":"   29","line":"#include <vector>"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"#include <assert.h>"},
{"lineNum":"   32","line":"#include <stdint.h>"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"namespace bech32"},
{"lineNum":"   35","line":"{"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"namespace"},
{"lineNum":"   38","line":"{"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"typedef std::vector<uint8_t> data;"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"/** The Bech32 character set for encoding. */"},
{"lineNum":"   43","line":"const char* CHARSET = \"qpzry9x8gf2tvdw0s3jn54khce6mua7l\";"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"/** The Bech32 character set for decoding. */"},
{"lineNum":"   46","line":"const int8_t CHARSET_REV[128] = {"},
{"lineNum":"   47","line":"    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,"},
{"lineNum":"   48","line":"    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,"},
{"lineNum":"   49","line":"    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,"},
{"lineNum":"   50","line":"    15, -1, 10, 17, 21, 20, 26, 30,  7,  5, -1, -1, -1, -1, -1, -1,"},
{"lineNum":"   51","line":"    -1, 29, -1, 24, 13, 25,  9,  8, 23, -1, 18, 22, 31, 27, 19, -1,"},
{"lineNum":"   52","line":"     1,  0,  3, 16, 11, 28, 12, 14,  6,  4,  2, -1, -1, -1, -1, -1,"},
{"lineNum":"   53","line":"    -1, 29, -1, 24, 13, 25,  9,  8, 23, -1, 18, 22, 31, 27, 19, -1,"},
{"lineNum":"   54","line":"     1,  0,  3, 16, 11, 28, 12, 14,  6,  4,  2, -1, -1, -1, -1, -1"},
{"lineNum":"   55","line":"};"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"/** Concatenate two byte arrays. */"},
{"lineNum":"   58","line":"data cat(data x, const data& y) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   59","line":"    x.insert(x.end(), y.begin(), y.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    return x;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"}"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"/* Determine the final constant to use for the specified encoding. */"},
{"lineNum":"   64","line":"uint32_t encoding_constant(Encoding encoding) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   65","line":"    assert(encoding == Encoding::BECH32 || encoding == Encoding::BECH32M);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"    return encoding == Encoding::BECH32 ? 1 : 0x2bc830a3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"}"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"/** This function will compute what 6 5-bit values to XOR into the last 6 input values, in order to"},
{"lineNum":"   70","line":" *  make the checksum 0. These 6 values are packed together in a single 30-bit integer. The higher"},
{"lineNum":"   71","line":" *  bits correspond to earlier values. */"},
{"lineNum":"   72","line":"uint32_t polymod(const data& values)"},
{"lineNum":"   73","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   74","line":"    // The input is interpreted as a list of coefficients of a polynomial over F = GF(32), with an"},
{"lineNum":"   75","line":"    // implicit 1 in front. If the input is [v0,v1,v2,v3,v4], that polynomial is v(x) ="},
{"lineNum":"   76","line":"    // 1*x^5 + v0*x^4 + v1*x^3 + v2*x^2 + v3*x + v4. The implicit 1 guarantees that"},
{"lineNum":"   77","line":"    // [v0,v1,v2,...] has a distinct checksum from [0,v0,v1,v2,...]."},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    // The output is a 30-bit integer whose 5-bit groups are the coefficients of the remainder of"},
{"lineNum":"   80","line":"    // v(x) mod g(x), where g(x) is the Bech32 generator,"},
{"lineNum":"   81","line":"    // x^6 + {29}x^5 + {22}x^4 + {20}x^3 + {21}x^2 + {29}x + {18}. g(x) is chosen in such a way"},
{"lineNum":"   82","line":"    // that the resulting code is a BCH code, guaranteeing detection of up to 3 errors within a"},
{"lineNum":"   83","line":"    // window of 1023 characters. Among the various possible BCH codes, one was selected to in"},
{"lineNum":"   84","line":"    // fact guarantee detection of up to 4 errors within a window of 89 characters."},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    // Note that the coefficients are elements of GF(32), here represented as decimal numbers"},
{"lineNum":"   87","line":"    // between {}. In this finite field, addition is just XOR of the corresponding numbers. For"},
{"lineNum":"   88","line":"    // example, {27} + {13} = {27 ^ 13} = {22}. Multiplication is more complicated, and requires"},
{"lineNum":"   89","line":"    // treating the bits of values themselves as coefficients of a polynomial over a smaller field,"},
{"lineNum":"   90","line":"    // GF(2), and multiplying those polynomials mod a^5 + a^3 + 1. For example, {5} * {26} ="},
{"lineNum":"   91","line":"    // (a^2 + 1) * (a^4 + a^3 + a) = (a^4 + a^3 + a) * a^2 + (a^4 + a^3 + a) = a^6 + a^5 + a^4 + a"},
{"lineNum":"   92","line":"    // = a^3 + 1 (mod a^5 + a^3 + 1) = {9}."},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    // During the course of the loop below, `c` contains the bitpacked coefficients of the"},
{"lineNum":"   95","line":"    // polynomial constructed from just the values of v that were processed so far, mod g(x). In"},
{"lineNum":"   96","line":"    // the above example, `c` initially corresponds to 1 mod g(x), and after processing 2 inputs of"},
{"lineNum":"   97","line":"    // v, it corresponds to x^2 + v0*x + v1 mod g(x). As 1 mod g(x) = 1, that is the starting value"},
{"lineNum":"   98","line":"    // for `c`."},
{"lineNum":"   99","line":"    uint32_t c = 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"    for (const auto v_i : values) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  101","line":"        // We want to update `c` to correspond to a polynomial with one extra term. If the initial"},
{"lineNum":"  102","line":"        // value of `c` consists of the coefficients of c(x) = f(x) mod g(x), we modify it to"},
{"lineNum":"  103","line":"        // correspond to c\'(x) = (f(x) * x + v_i) mod g(x), where v_i is the next input to"},
{"lineNum":"  104","line":"        // process. Simplifying:"},
{"lineNum":"  105","line":"        // c\'(x) = (f(x) * x + v_i) mod g(x)"},
{"lineNum":"  106","line":"        //         ((f(x) mod g(x)) * x + v_i) mod g(x)"},
{"lineNum":"  107","line":"        //         (c(x) * x + v_i) mod g(x)"},
{"lineNum":"  108","line":"        // If c(x) = c0*x^5 + c1*x^4 + c2*x^3 + c3*x^2 + c4*x + c5, we want to compute"},
{"lineNum":"  109","line":"        // c\'(x) = (c0*x^5 + c1*x^4 + c2*x^3 + c3*x^2 + c4*x + c5) * x + v_i mod g(x)"},
{"lineNum":"  110","line":"        //       = c0*x^6 + c1*x^5 + c2*x^4 + c3*x^3 + c4*x^2 + c5*x + v_i mod g(x)"},
{"lineNum":"  111","line":"        //       = c0*(x^6 mod g(x)) + c1*x^5 + c2*x^4 + c3*x^3 + c4*x^2 + c5*x + v_i"},
{"lineNum":"  112","line":"        // If we call (x^6 mod g(x)) = k(x), this can be written as"},
{"lineNum":"  113","line":"        // c\'(x) = (c1*x^5 + c2*x^4 + c3*x^3 + c4*x^2 + c5*x + v_i) + c0*k(x)"},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"        // First, determine the value of c0:"},
{"lineNum":"  116","line":"        uint8_t c0 = c >> 25;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"        // Then compute c1*x^5 + c2*x^4 + c3*x^3 + c4*x^2 + c5*x + v_i:"},
{"lineNum":"  119","line":"        c = ((c & 0x1ffffff) << 5) ^ v_i;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"        // Finally, for each set bit n in c0, conditionally add {2^n}k(x):"},
{"lineNum":"  122","line":"        if (c0 & 1)  c ^= 0x3b6a57b2; //     k(x) = {29}x^5 + {22}x^4 + {20}x^3 + {21}x^2 + {29}x + {18}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"        if (c0 & 2)  c ^= 0x26508e6d; //  {2}k(x) = {19}x^5 +  {5}x^4 +     x^3 +  {3}x^2 + {19}x + {13}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"        if (c0 & 4)  c ^= 0x1ea119fa; //  {4}k(x) = {15}x^5 + {10}x^4 +  {2}x^3 +  {6}x^2 + {15}x + {26}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"        if (c0 & 8)  c ^= 0x3d4233dd; //  {8}k(x) = {30}x^5 + {20}x^4 +  {4}x^3 + {12}x^2 + {30}x + {29}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":"        if (c0 & 16) c ^= 0x2a1462b3; // {16}k(x) = {21}x^5 +     x^4 +  {8}x^3 + {24}x^2 + {21}x + {19}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"    }"},
{"lineNum":"  128","line":"    return c;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  129","line":"}"},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"/** Convert to lower case. */"},
{"lineNum":"  132","line":"unsigned char lc(unsigned char c) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  133","line":"    return (c >= \'A\' && c <= \'Z\') ? (c - \'A\') + \'a\' : c;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"}"},
{"lineNum":"  135","line":""},
{"lineNum":"  136","line":"/** Expand a HRP for use in checksum computation. */"},
{"lineNum":"  137","line":"data expand_hrp(const std::string& hrp) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  138","line":"    data ret;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"    ret.resize(hrp.size() * 2 + 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":"    for (size_t i = 0; i < hrp.size(); ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  141","line":"        unsigned char c = hrp[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  142","line":"        ret[i] = c >> 5;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  143","line":"        ret[i + hrp.size() + 1] = c & 0x1f;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"    }"},
{"lineNum":"  145","line":"    ret[hrp.size()] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"    return ret;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"/** Verify a checksum. */"},
{"lineNum":"  150","line":"Encoding verify_checksum(const std::string& hrp, const data& values) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  151","line":"    // PolyMod computes what value to xor into the final values to make the checksum 0. However,"},
{"lineNum":"  152","line":"    // if we required that the checksum was 0, it would be the case that appending a 0 to a valid"},
{"lineNum":"  153","line":"    // list of values would result in a new valid list. For that reason, Bech32 requires the"},
{"lineNum":"  154","line":"    // resulting checksum to be 1 instead. In Bech32m, this constant was amended."},
{"lineNum":"  155","line":"    uint32_t check = polymod(cat(expand_hrp(hrp), values));","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  156","line":"    if (check == encoding_constant(Encoding::BECH32)) return Encoding::BECH32;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"    if (check == encoding_constant(Encoding::BECH32M)) return Encoding::BECH32M;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"    return Encoding::INVALID;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  159","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"data create_checksum(const std::string& hrp, const data& values, Encoding encoding) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  162","line":"    data enc = cat(expand_hrp(hrp), values);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  163","line":"    enc.resize(enc.size() + 6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  164","line":"    uint32_t mod = polymod(enc) ^ encoding_constant(encoding);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":"    data ret;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"    ret.resize(6);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  167","line":"    for (size_t i = 0; i < 6; ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  168","line":"        // Convert the 5-bit groups in mod to checksum values."},
{"lineNum":"  169","line":"        ret[i] = (mod >> (5 * (5 - i))) & 31;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":"    }"},
{"lineNum":"  171","line":"    return ret;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"} // namespace"},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":"/** Encode a Bech32 or Bech32m string. */"},
{"lineNum":"  177","line":"std::string encode(const std::string& hrp, const data& values, Encoding encoding) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  178","line":"    // First ensure that the HRP is all lowercase. BIP-173 requires an encoder"},
{"lineNum":"  179","line":"    // to return a lowercase Bech32 string, but if given an uppercase HRP, the"},
{"lineNum":"  180","line":"    // result will always be invalid."},
{"lineNum":"  181","line":"    for (const char& c : hrp) assert(c < \'A\' || c > \'Z\');","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":"    data checksum = create_checksum(hrp, values, encoding);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":"    data combined = cat(values, checksum);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  184","line":"    std::string ret = hrp + \'1\';","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":"    ret.reserve(ret.size() + combined.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  186","line":"    for (const auto c : combined) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  187","line":"        ret += CHARSET[c];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":"    }"},
{"lineNum":"  189","line":"    return ret;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  190","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"/** Decode a Bech32 or Bech32m string. */"},
{"lineNum":"  193","line":"DecodeResult decode(const std::string& str) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  194","line":"    bool lower = false, upper = false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  195","line":"    for (size_t i = 0; i < str.size(); ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  196","line":"        unsigned char c = str[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  197","line":"        if (c >= \'a\' && c <= \'z\') lower = true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  198","line":"        else if (c >= \'A\' && c <= \'Z\') upper = true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  199","line":"        else if (c < 33 || c > 126) return {};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  200","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  201","line":"    if (lower && upper) return {};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  202","line":"    size_t pos = str.rfind(\'1\');","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  203","line":"    if (pos == str.npos || pos == 0 || pos + 7 > str.size()) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  204","line":"        return {};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":"    }"},
{"lineNum":"  206","line":"    data values(str.size() - 1 - pos);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  207","line":"    for (size_t i = 0; i < str.size() - 1 - pos; ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  208","line":"        unsigned char c = str[i + pos + 1];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  209","line":"        int8_t rev = CHARSET_REV[c];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  210","line":""},
{"lineNum":"  211","line":"        if (rev == -1) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  212","line":"            return {};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"        }"},
{"lineNum":"  214","line":"        values[i] = rev;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  215","line":"    }"},
{"lineNum":"  216","line":"    std::string hrp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"    for (size_t i = 0; i < pos; ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  218","line":"        hrp += lc(str[i]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  219","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":"    Encoding result = verify_checksum(hrp, values);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  221","line":"    if (result == Encoding::INVALID) return {};","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  222","line":"    return {result, std::move(hrp), data(values.begin(), values.end() - 6)};","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  223","line":"}","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"/** Convert from one power-of-2 number base to another. */"},
{"lineNum":"  226","line":"bool convertbits(std::vector<uint8_t>& out, const std::vector<uint8_t>& in, int frombits, int tobits, bool pad) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  227","line":"    int acc = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  228","line":"    int bits = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  229","line":"    const int maxv = (1 << tobits) - 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  230","line":"    const int max_acc = (1 << (frombits + tobits - 1)) - 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  231","line":"    for (size_t i = 0; i < in.size(); ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  232","line":"        int value = in[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  233","line":"        acc = ((acc << frombits) | value) & max_acc;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  234","line":"        bits += frombits;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  235","line":"        while (bits >= tobits) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  236","line":"            bits -= tobits;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  237","line":"            out.push_back((acc >> bits) & maxv);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  238","line":"        }"},
{"lineNum":"  239","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  240","line":"    if (pad) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  241","line":"        if (bits) out.push_back((acc << (tobits - bits)) & maxv);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  242","line":"    } else if (bits >= frombits || ((acc << (tobits - bits)) & maxv)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  243","line":"        return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  244","line":"    }"},
{"lineNum":"  245","line":"    return true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  246","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  247","line":""},
{"lineNum":"  248","line":"} // namespace bech32"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "spend_transaction_debug", "date" : "2023-08-30 10:00:58", "instrumented" : 101, "covered" : 0,};
var merged_data = [];
