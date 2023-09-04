var data = {lines:[
{"lineNum":"    1","line":"#include \"../../libspark/bech32.h\""},
{"lineNum":"    2","line":"#include \"../FuzzedDataProvider.h\""},
{"lineNum":"    3","line":"#include <stdint.h>"},
{"lineNum":"    4","line":"#include <cassert>"},
{"lineNum":"    5","line":"#include <string>"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"// enum class Bech32EncodingForFuzzing {"},
{"lineNum":"    8","line":"//     INVALID,"},
{"lineNum":"    9","line":"//     BECH32,"},
{"lineNum":"   10","line":"//     BECH32M,"},
{"lineNum":"   11","line":"//     kMaxValue = BECH32M"},
{"lineNum":"   12","line":"// };"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"bool CaseInsensitiveEqual(const std::string& s1, const std::string& s2)"},
{"lineNum":"   15","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   16","line":"    if (s1.size() != s2.size()) return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   17","line":"    for (size_t i = 0; i < s1.size(); ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   18","line":"        char c1 = s1[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   19","line":"        if (c1 >= \'A\' && c1 <= \'Z\') c1 -= (\'A\' - \'a\');","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   20","line":"        char c2 = s2[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   21","line":"        if (c2 >= \'A\' && c2 <= \'Z\') c2 -= (\'A\' - \'a\');","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":"        if (c1 != c2) return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"    return true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineCov","hits":"2","order":"1","possible_hits":"2",},
{"lineNum":"   28","line":"    FuzzedDataProvider fuzzed_data(buf, len);","class":"lineCov","hits":"1","order":"2","possible_hits":"1",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    std::string test_string = fuzzed_data.ConsumeBytesAsString(len);","class":"lineCov","hits":"1","order":"4","possible_hits":"1",},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    const auto r1 = bech32::decode(test_string);","class":"lineCov","hits":"1","order":"17","possible_hits":"1",},
{"lineNum":"   33","line":"    if(r1.hrp.empty()) {","class":"lineCov","hits":"1","order":"31","possible_hits":"1",},
{"lineNum":"   34","line":"        assert(r1.encoding == bech32::Encoding::INVALID);","class":"lineCov","hits":"1","order":"32","possible_hits":"1",},
{"lineNum":"   35","line":"        assert(r1.data.empty());","class":"lineCov","hits":"1","order":"33","possible_hits":"1",},
{"lineNum":"   36","line":"    } else {","class":"lineCov","hits":"1","order":"34","possible_hits":"1",},
{"lineNum":"   37","line":"        assert(r1.encoding != bech32::Encoding::INVALID);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"        const std::string reencoded = bech32::encode(r1.hrp, r1.data, r1.encoding);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"        assert(CaseInsensitiveEqual(test_string, reencoded));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    std::vector<uint8_t> input = fuzzed_data.ConsumeBytes<uint8_t>(len);","class":"lineCov","hits":"1","order":"35","possible_hits":"1",},
{"lineNum":"   43","line":"    std::vector<uint8_t> test_vec2 = fuzzed_data.ConsumeBytes<uint8_t>(len);","class":"lineCov","hits":"1","order":"44","possible_hits":"1",},
{"lineNum":"   44","line":"    int test_frombits = fuzzed_data.ConsumeIntegral<int>();","class":"lineCov","hits":"1","order":"45","possible_hits":"1",},
{"lineNum":"   45","line":"    int test_to_bits = fuzzed_data.ConsumeIntegral<int>();","class":"lineCov","hits":"1","order":"59","possible_hits":"1",},
{"lineNum":"   46","line":"    bool test_pad = fuzzed_data.ConsumeBool();","class":"lineCov","hits":"1","order":"60","possible_hits":"1",},
{"lineNum":"   47","line":"    bech32::convertbits(input, test_vec2, test_frombits, test_to_bits, test_pad);","class":"lineCov","hits":"1","order":"63","possible_hits":"1",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    if(input.size() + 3 + 6 <= 90) {","class":"lineCov","hits":"1","order":"73","possible_hits":"1",},
{"lineNum":"   50","line":"        for (auto encoding: {bech32::Encoding::BECH32, bech32::Encoding::BECH32M}) {","class":"lineCov","hits":"2","order":"74","possible_hits":"2",},
{"lineNum":"   51","line":"            const std::string encoded = bech32::encode(\"bc\",  input, encoding );","class":"linePartCov","hits":"1","order":"75","possible_hits":"2",},
{"lineNum":"   52","line":"            assert(!encoded.empty());","class":"lineCov","hits":"1","order":"123","possible_hits":"1",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"            const auto r2 = bech32::decode(encoded);","class":"lineCov","hits":"1","order":"124","possible_hits":"1",},
{"lineNum":"   55","line":"            assert(r2.encoding == encoding);","class":"lineCov","hits":"1","order":"146","possible_hits":"1",},
{"lineNum":"   56","line":"            assert(r2.hrp == \"bc\");","class":"lineCov","hits":"1","order":"147","possible_hits":"1",},
{"lineNum":"   57","line":"            assert(r2.data == input);","class":"lineCov","hits":"1","order":"148","possible_hits":"1",},
{"lineNum":"   58","line":"        }","class":"linePartCov","hits":"1","order":"149","possible_hits":"3",},
{"lineNum":"   59","line":"    }","class":"lineCov","hits":"1","order":"152","possible_hits":"1",},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    return 0;"},
{"lineNum":"   62","line":"}","class":"linePartCov","hits":"1","order":"153","possible_hits":"6",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bech32_debug", "date" : "2023-08-29 07:45:00", "instrumented" : 40, "covered" : 25,};
var merged_data = [];
