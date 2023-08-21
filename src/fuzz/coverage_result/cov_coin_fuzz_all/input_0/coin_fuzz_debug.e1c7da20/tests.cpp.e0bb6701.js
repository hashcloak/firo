var data = {lines:[
{"lineNum":"    1","line":"#if defined HAVE_CONFIG_H"},
{"lineNum":"    2","line":"#include \"../libsecp256k1-config.h\""},
{"lineNum":"    3","line":"#endif"},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#include <iostream>"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#include \"../secp256k1.c\""},
{"lineNum":"    8","line":"#include \"../include/secp256k1.h\""},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include \"../util.h\""},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"#ifdef ENABLE_OPENSSL_TESTS"},
{"lineNum":"   13","line":"#include \"include/GroupElement.h\""},
{"lineNum":"   14","line":"#include \"include/Scalar.h\""},
{"lineNum":"   15","line":"#endif"},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"int main(int argc, char* argv[])"},
{"lineNum":"   18","line":"{","class":"lineCov","hits":"2","order":"35","possible_hits":"2",},
{"lineNum":"   19","line":"#ifdef ENABLE_OPENSSL_TESTS"},
{"lineNum":"   20","line":"    std::vector<std::pair<const char*, const char*>> testcases;"},
{"lineNum":"   21","line":"    testcases.push_back(std::make_pair(\"9216064434961179932092223867844635691966339998754536116709681652691785432045\","},
{"lineNum":"   22","line":"        \"33986433546870000256104618635743654523665060392313886665479090285075695067131\"));"},
{"lineNum":"   23","line":"    testcases.push_back(std::make_pair(\"50204771751011461524623624559944050110546921468100198079190811223951215371253\","},
{"lineNum":"   24","line":"        \"33986433546870000256104618635743654523665060392313886665479090285075695067131\"));"},
{"lineNum":"   25","line":"    testcases.push_back(std::make_pair(\"7143275630583997983432964947790981761478339235433352888289260750805571589245\","},
{"lineNum":"   26","line":"        \"11700086115751491157288596384709446578503357013980342842588483174733971680454\"));"},
{"lineNum":"   27","line":"    testcases.push_back(std::make_pair(\"7143275630583997983432964947790981761478339235433352888289260750805571589245\","},
{"lineNum":"   28","line":"        \"-11700086115751491157288596384709446578503357013980342842588483174733971680454\"));"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    std::vector<std::pair<const char*, const char*>> hexTestcases;"},
{"lineNum":"   31","line":"    hexTestcases.push_back(std::make_pair(\"14601b8cdf761d4ed94554865ef0ef5c451e275f3dfc0a667fea04fa5a833bed\","},
{"lineNum":"   32","line":"        \"4b23a3c385114c40cb4fbf02d1a52f731b4edf61c247372d038470eea90edffb\"));"},
{"lineNum":"   33","line":"    hexTestcases.push_back(std::make_pair(\"6efee4d1ba231acfee2391dc5ded838cee89235af14b8a4f494e4734cb1323f5\","},
{"lineNum":"   34","line":"        \"4b23a3c385114c40cb4fbf02d1a52f731b4edf61c247372d038470eea90edffb\"));"},
{"lineNum":"   35","line":"    hexTestcases.push_back(std::make_pair(\"fcaf3630cd86c0b9dc6b122aeca20b065a14f861c291cd53a989f0e9fe1d47d\","},
{"lineNum":"   36","line":"        \"19de0399d7578731a20abff9283e66117f8cc02be53c4cc86eb5ac3378c36cc6\"));"},
{"lineNum":"   37","line":"    hexTestcases.push_back(std::make_pair(\"fcaf3630cd86c0b9dc6b122aeca20b065a14f861c291cd53a989f0e9fe1d47d\","},
{"lineNum":"   38","line":"        \"e621fc6628a878ce5df54006d7c199ee80733fd41ac3b337914a53cc873c933a\"));"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    std::vector<const char*> expecteds;"},
{"lineNum":"   41","line":"    expecteds.push_back("},
{"lineNum":"   42","line":"        \"(9216064434961179932092223867844635691966339998754536116709681652691785432045,\""},
{"lineNum":"   43","line":"        \"33986433546870000256104618635743654523665060392313886665479090285075695067131)\");"},
{"lineNum":"   44","line":"    expecteds.push_back("},
{"lineNum":"   45","line":"        \"(50204771751011461524623624559944050110546921468100198079190811223951215371253,\""},
{"lineNum":"   46","line":"        \"33986433546870000256104618635743654523665060392313886665479090285075695067131)\");"},
{"lineNum":"   47","line":"    expecteds.push_back("},
{"lineNum":"   48","line":"        \"(7143275630583997983432964947790981761478339235433352888289260750805571589245,\""},
{"lineNum":"   49","line":"        \"11700086115751491157288596384709446578503357013980342842588483174733971680454)\");"},
{"lineNum":"   50","line":"    expecteds.push_back("},
{"lineNum":"   51","line":"        \"(7143275630583997983432964947790981761478339235433352888289260750805571589245,\""},
{"lineNum":"   52","line":"        \"-11700086115751491157288596384709446578503357013980342842588483174733971680454)\");"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    std::vector<const char*> expectedHexs;"},
{"lineNum":"   56","line":"    expectedHexs.push_back("},
{"lineNum":"   57","line":"        \"(14601b8cdf761d4ed94554865ef0ef5c451e275f3dfc0a667fea04fa5a833bed,\""},
{"lineNum":"   58","line":"        \"4b23a3c385114c40cb4fbf02d1a52f731b4edf61c247372d038470eea90edffb)\");"},
{"lineNum":"   59","line":"    expectedHexs.push_back("},
{"lineNum":"   60","line":"        \"(6efee4d1ba231acfee2391dc5ded838cee89235af14b8a4f494e4734cb1323f5,\""},
{"lineNum":"   61","line":"        \"4b23a3c385114c40cb4fbf02d1a52f731b4edf61c247372d038470eea90edffb)\");"},
{"lineNum":"   62","line":"    expectedHexs.push_back("},
{"lineNum":"   63","line":"        \"(fcaf3630cd86c0b9dc6b122aeca20b065a14f861c291cd53a989f0e9fe1d47d,\""},
{"lineNum":"   64","line":"        \"19de0399d7578731a20abff9283e66117f8cc02be53c4cc86eb5ac3378c36cc6)\");"},
{"lineNum":"   65","line":"    expectedHexs.push_back("},
{"lineNum":"   66","line":"        \"(fcaf3630cd86c0b9dc6b122aeca20b065a14f861c291cd53a989f0e9fe1d47d,\""},
{"lineNum":"   67","line":"        \"e621fc6628a878ce5df54006d7c199ee80733fd41ac3b337914a53cc873c933a)\");"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    for (int i = 0; i < testcases.size(); i++) {"},
{"lineNum":"   70","line":"        auto& t = testcases[i];"},
{"lineNum":"   71","line":"        secp_primitives::GroupElement g(t.first, t.second);"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"        if (expecteds[i] != g.tostring()) {"},
{"lineNum":"   74","line":"            std::cout<< \"expected:\" << expecteds[i] << \", get: \" << g.tostring() << std::endl;"},
{"lineNum":"   75","line":"            return EXIT_FAILURE;"},
{"lineNum":"   76","line":"        }"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"        if (expectedHexs[i] != \"\" && expectedHexs[i] != g.GetHex()) {"},
{"lineNum":"   79","line":"            std::cout<< \"expected[hex]:\" << expectedHexs[i] << \", get: \" << g.GetHex() << std::endl;"},
{"lineNum":"   80","line":"            return EXIT_FAILURE;"},
{"lineNum":"   81","line":"        }"},
{"lineNum":"   82","line":"    }"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"    for (int i = 0; i < hexTestcases.size(); i++) {"},
{"lineNum":"   85","line":"        auto& t = hexTestcases[i];"},
{"lineNum":"   86","line":"        secp_primitives::GroupElement g(t.first, t.second, 16);"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"        if (expecteds[i] != g.tostring()) {"},
{"lineNum":"   89","line":"            std::cout<< \"expected:\" << expecteds[i] << \", get: \" << g.tostring() << std::endl;"},
{"lineNum":"   90","line":"            return EXIT_FAILURE;"},
{"lineNum":"   91","line":"        }"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"        if (expectedHexs[i] != \"\" && expectedHexs[i] != g.GetHex()) {"},
{"lineNum":"   94","line":"            std::cout<< \"expected[hex]:\" << expectedHexs[i] << \", get: \" << g.GetHex() << std::endl;"},
{"lineNum":"   95","line":"            return EXIT_FAILURE;"},
{"lineNum":"   96","line":"        }"},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"    // test scalar infinite loop bugs on GCC 8"},
{"lineNum":"  100","line":"    secp_primitives::Scalar scalar;"},
{"lineNum":"  101","line":"    scalar.randomize();"},
{"lineNum":"  102","line":"#endif"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    return EXIT_SUCCESS;","class":"linePartCov","hits":"1","order":"36","possible_hits":"2",},
{"lineNum":"  105","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_fuzz_debug", "date" : "2023-08-02 12:12:32", "instrumented" : 2, "covered" : 2,};
var merged_data = [];
