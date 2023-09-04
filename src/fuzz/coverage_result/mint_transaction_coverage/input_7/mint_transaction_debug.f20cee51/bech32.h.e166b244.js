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
{"lineNum":"   22","line":"#ifndef BECH32_H_"},
{"lineNum":"   23","line":"#define BECH32_H_ 1"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"#include <string>"},
{"lineNum":"   26","line":"#include <tuple>"},
{"lineNum":"   27","line":"#include <vector>"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"#include <stdint.h>"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"namespace bech32"},
{"lineNum":"   32","line":"{"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"enum class Encoding {"},
{"lineNum":"   35","line":"    INVALID,"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    BECH32,  //! Bech32 encoding as defined in BIP173"},
{"lineNum":"   38","line":"    BECH32M, //! Bech32m encoding as defined in BIP350"},
{"lineNum":"   39","line":"};"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"/** Encode a Bech32 or Bech32m string. If hrp contains uppercase characters, this will cause an"},
{"lineNum":"   42","line":" *  assertion error. Encoding must be one of BECH32 or BECH32M. */"},
{"lineNum":"   43","line":"std::string encode(const std::string& hrp, const std::vector<uint8_t>& values, Encoding encoding);"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"/** A type for the result of decoding. */"},
{"lineNum":"   46","line":"struct DecodeResult","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   47","line":"{"},
{"lineNum":"   48","line":"    Encoding encoding;         //!< What encoding was detected in the result; Encoding::INVALID if failed."},
{"lineNum":"   49","line":"    std::string hrp;           //!< The human readable part"},
{"lineNum":"   50","line":"    std::vector<uint8_t> data; //!< The payload (excluding checksum)"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    DecodeResult() : encoding(Encoding::INVALID) {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   53","line":"    DecodeResult(Encoding enc, std::string&& h, std::vector<uint8_t>&& d) : encoding(enc), hrp(std::move(h)), data(std::move(d)) {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":"};"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"/** Decode a Bech32 or Bech32m string. */"},
{"lineNum":"   57","line":"DecodeResult decode(const std::string& str);"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"/** Convert from one power-of-2 number base to another. */"},
{"lineNum":"   60","line":"bool convertbits(std::vector<uint8_t>& out, const std::vector<uint8_t>& in, int frombits, int tobits, bool pad);"},
{"lineNum":"   61","line":"}  // namespace bech32"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"#endif  // BECH32_H_"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:27:19", "instrumented" : 3, "covered" : 0,};
var merged_data = [];
