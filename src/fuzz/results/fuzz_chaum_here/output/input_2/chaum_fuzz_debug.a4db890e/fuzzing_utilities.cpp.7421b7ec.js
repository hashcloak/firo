var data = {lines:[
{"lineNum":"    1","line":"#include \"fuzzing_utilities.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"FuzzedSecp256k1Object::FuzzedSecp256k1Object(FuzzedDataProvider *fdp) {","class":"lineCov","hits":"2","order":"30","possible_hits":"2",},
{"lineNum":"    4","line":"    this->fdp = fdp;","class":"lineCov","hits":"1","order":"31","possible_hits":"1",},
{"lineNum":"    5","line":"}","class":"linePartCov","hits":"1","order":"32","possible_hits":"2",},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"secp_primitives::GroupElement FuzzedSecp256k1Object::GetGroupElement() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    8","line":"    char* x = (char *)this->fdp->ConsumeBytes<uint8_t>(256).data();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    9","line":"    char* y = (char *)this->fdp->ConsumeBytes<uint8_t>(256).data();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   10","line":"    secp_primitives::GroupElement ge = secp_primitives::GroupElement(x, y);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"    return ge;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   13","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"secp_primitives::Scalar FuzzedSecp256k1Object::GetScalar() {","class":"lineCov","hits":"2","order":"1513","possible_hits":"2",},
{"lineNum":"   16","line":"    uint64_t value = this->fdp->ConsumeIntegral<uint64_t>();","class":"lineCov","hits":"1","order":"1514","possible_hits":"1",},
{"lineNum":"   17","line":"    secp_primitives::Scalar s = secp_primitives::Scalar(value);","class":"lineCov","hits":"1","order":"1515","possible_hits":"1",},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"    return s;","class":"lineCov","hits":"1","order":"1516","possible_hits":"1",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"}","class":"lineCov","hits":"1","order":"1517","possible_hits":"1",},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"std::vector<secp_primitives::GroupElement> FuzzedSecp256k1Object::GetGroupElements(int len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   24","line":"    std::vector<secp_primitives::GroupElement> ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"    ge_vec.resize(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"    for (int i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   27","line":"        ge_vec.push_back(GetGroupElement());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   28","line":"    }"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    return ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"std::vector<secp_primitives::Scalar> FuzzedSecp256k1Object::GetScalars(int len) {","class":"lineCov","hits":"2","order":"1521","possible_hits":"2",},
{"lineNum":"   34","line":"    std::vector<secp_primitives::Scalar> scalar_vec;","class":"lineCov","hits":"1","order":"1522","possible_hits":"1",},
{"lineNum":"   35","line":"    scalar_vec.resize(len);","class":"lineCov","hits":"1","order":"1523","possible_hits":"1",},
{"lineNum":"   36","line":"    for (int i = 0; i <= len; i++) {","class":"lineCov","hits":"2","order":"1524","possible_hits":"2",},
{"lineNum":"   37","line":"        scalar_vec.push_back(GetScalar());","class":"linePartCov","hits":"1","order":"1525","possible_hits":"2",},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    return scalar_vec;","class":"lineCov","hits":"1","order":"1526","possible_hits":"1",},
{"lineNum":"   41","line":"}","class":"linePartCov","hits":"1","order":"1527","possible_hits":"2",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "chaum_fuzz_debug", "date" : "2023-08-09 12:13:12", "instrumented" : 28, "covered" : 15,};
var merged_data = [];
