var data = {lines:[
{"lineNum":"    1","line":"#include \"../../libspark/f4grumble.h\""},
{"lineNum":"    2","line":"#include <stdint.h>"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineCov","hits":"2","order":"26","possible_hits":"2",},
{"lineNum":"    5","line":"    std::string test_string = std::string((char *) buf);","class":"linePartCov","hits":"1","order":"27","possible_hits":"4",},
{"lineNum":"    6","line":"    std::vector<unsigned char> test_char_vec;","class":"lineCov","hits":"1","order":"28","possible_hits":"1",},
{"lineNum":"    7","line":"    test_char_vec.reserve(len);","class":"lineCov","hits":"1","order":"29","possible_hits":"1",},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"    for (int i=0; i < len; i++) {","class":"lineCov","hits":"2","order":"30","possible_hits":"2",},
{"lineNum":"   10","line":"        test_char_vec.push_back(test_string[i]);","class":"lineCov","hits":"1","order":"31","possible_hits":"1",},
{"lineNum":"   11","line":"    }","class":"lineCov","hits":"1","order":"32","possible_hits":"1",},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"    // too_long_size"},
{"lineNum":"   14","line":"    bool exception_thrown_size = false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   15","line":"    bool exception_thrown_encode = false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   16","line":"    bool exception_thrown_decode = false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"    if(len > spark::F4Grumble::get_max_size()){","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"        try {"},
{"lineNum":"   21","line":"            spark::F4Grumble grumble(test_string[0], len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":"        } catch(const std::exception& ) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   23","line":"            exception_thrown_size = true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"        assert(exception_thrown_size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"        spark::F4Grumble grumble = spark::F4Grumble(test_string[0], len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"        try {"},
{"lineNum":"   30","line":"            grumble.encode(test_char_vec);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"        } catch (const std::exception& ) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":"            exception_thrown_encode = true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"        assert(exception_thrown_encode);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"        try {"},
{"lineNum":"   37","line":"            grumble.decode(test_char_vec);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"        } catch (const std::exception& ) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   39","line":"            exception_thrown_decode = true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"        assert(exception_thrown_decode);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    }"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    spark::F4Grumble f4grumble_fuzz = spark::F4Grumble(test_string[0], len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"    std::vector<unsigned char> scrambled = f4grumble_fuzz.encode(test_char_vec);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    std::vector<unsigned char> unscrambled = f4grumble_fuzz.decode(scrambled);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    assert(scrambled.size() == test_char_vec.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    assert(unscrambled == test_char_vec);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    // bad_network"},
{"lineNum":"   53","line":"    unsigned char evil_network = ~test_string[0];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"    assert(test_string[0] != evil_network);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    spark::F4Grumble evil_grumble(evil_network, len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"    //decoding with a different network"},
{"lineNum":"   58","line":"    std::vector<unsigned char> evil_unscrambled = evil_grumble.decode(scrambled);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"    assert(evil_unscrambled.size() == scrambled.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    assert(evil_unscrambled != test_char_vec);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"    return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"}","class":"lineNoCov","hits":"0","possible_hits":"9",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "f4grumble_debug", "date" : "2023-08-29 14:57:44", "instrumented" : 41, "covered" : 7,};
var merged_data = [];
