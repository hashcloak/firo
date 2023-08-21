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
{"lineNum":"   15","line":"secp_primitives::Scalar FuzzedSecp256k1Object::GetScalar() {","class":"lineCov","hits":"2","order":"611","possible_hits":"2",},
{"lineNum":"   16","line":"    uint64_t value = this->fdp->ConsumeIntegral<uint64_t>();","class":"lineCov","hits":"1","order":"612","possible_hits":"1",},
{"lineNum":"   17","line":"    secp_primitives::Scalar s = secp_primitives::Scalar(value);","class":"lineCov","hits":"1","order":"629","possible_hits":"1",},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"    return s;","class":"lineCov","hits":"1","order":"672","possible_hits":"1",},
{"lineNum":"   20","line":"}","class":"lineCov","hits":"1","order":"673","possible_hits":"1",},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"secp_primitives::GroupElement FuzzedSecp256k1Object::GetMemberGroupElement() {","class":"lineCov","hits":"2","order":"51","possible_hits":"2",},
{"lineNum":"   23","line":"    secp_primitives::GroupElement ge;","class":"lineCov","hits":"1","order":"52","possible_hits":"1",},
{"lineNum":"   24","line":"    ge.randomize();","class":"lineCov","hits":"1","order":"53","possible_hits":"1",},
{"lineNum":"   25","line":"    return ge;","class":"lineCov","hits":"1","order":"590","possible_hits":"1",},
{"lineNum":"   26","line":"}","class":"lineCov","hits":"1","order":"591","possible_hits":"1",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"std::vector<secp_primitives::GroupElement> FuzzedSecp256k1Object::GetMemberGroupElements(size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   29","line":"    std::vector<secp_primitives::GroupElement> ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    ge_vec.resize(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"    for (int i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":"        ge_vec.push_back(GetMemberGroupElement());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   33","line":"    }"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    return ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"std::vector<secp_primitives::GroupElement> FuzzedSecp256k1Object::GetGroupElements(int len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   39","line":"    std::vector<secp_primitives::GroupElement> ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    ge_vec.resize(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"    for (int i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"        ge_vec.push_back(GetGroupElement());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"    }"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    return ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"std::vector<secp_primitives::Scalar> FuzzedSecp256k1Object::GetScalars(int len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":"    std::vector<secp_primitives::Scalar> scalar_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    scalar_vec.resize(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"    for (int i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   52","line":"        scalar_vec.push_back(GetScalar());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   53","line":"    }"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    return scalar_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "schnorr_hfuzz_debug", "date" : "2023-08-14 14:04:06", "instrumented" : 40, "covered" : 13,};
var merged_data = [];
