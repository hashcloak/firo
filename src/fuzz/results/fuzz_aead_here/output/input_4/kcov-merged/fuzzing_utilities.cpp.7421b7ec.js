var data = {lines:[
{"lineNum":"    1","line":"#include \"fuzzing_utilities.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"FuzzedSecp256k1Object::FuzzedSecp256k1Object(FuzzedDataProvider *fdp) {","class":"lineCov","hits":"1","order":"30",},
{"lineNum":"    4","line":"    this->fdp = fdp;","class":"lineCov","hits":"1","order":"31",},
{"lineNum":"    5","line":"}","class":"lineCov","hits":"1","order":"32",},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"secp_primitives::GroupElement FuzzedSecp256k1Object::GetGroupElement() {","class":"lineCov","hits":"1","order":"34",},
{"lineNum":"    8","line":"    char* x = (char *)this->fdp->ConsumeBytes<uint8_t>(256).data();","class":"lineCov","hits":"1","order":"35",},
{"lineNum":"    9","line":"    char* y = (char *)this->fdp->ConsumeBytes<uint8_t>(256).data();","class":"lineCov","hits":"1","order":"54",},
{"lineNum":"   10","line":"    secp_primitives::GroupElement ge = secp_primitives::GroupElement(x, y);","class":"lineCov","hits":"1","order":"55",},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"    return ge;","class":"lineCov","hits":"1","order":"116",},
{"lineNum":"   13","line":"}","class":"lineCov","hits":"1","order":"117",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"secp_primitives::Scalar FuzzedSecp256k1Object::GetScalar() {","class":"lineNoCov","hits":"0",},
{"lineNum":"   16","line":"    uint64_t value = this->fdp->ConsumeIntegral<uint64_t>();","class":"lineNoCov","hits":"0",},
{"lineNum":"   17","line":"    secp_primitives::Scalar s = secp_primitives::Scalar(value);","class":"lineNoCov","hits":"0",},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"    return s;","class":"lineNoCov","hits":"0",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"std::vector<secp_primitives::GroupElement> FuzzedSecp256k1Object::GetGroupElements(int len) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   24","line":"    std::vector<secp_primitives::GroupElement> ge_vec;","class":"lineNoCov","hits":"0",},
{"lineNum":"   25","line":"    ge_vec.resize(len);","class":"lineNoCov","hits":"0",},
{"lineNum":"   26","line":"    for (int i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   27","line":"        ge_vec.push_back(GetGroupElement());","class":"lineNoCov","hits":"0",},
{"lineNum":"   28","line":"    }"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    return ge_vec;","class":"lineNoCov","hits":"0",},
{"lineNum":"   31","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"std::vector<secp_primitives::Scalar> FuzzedSecp256k1Object::GetScalars(int len) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   34","line":"    std::vector<secp_primitives::Scalar> scalar_vec;","class":"lineNoCov","hits":"0",},
{"lineNum":"   35","line":"    scalar_vec.resize(len);","class":"lineNoCov","hits":"0",},
{"lineNum":"   36","line":"    for (int i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   37","line":"        scalar_vec.push_back(GetScalar());","class":"lineNoCov","hits":"0",},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    return scalar_vec;","class":"lineNoCov","hits":"0",},
{"lineNum":"   41","line":"}","class":"lineNoCov","hits":"0",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "aead_fuzz_debug", "date" : "2023-08-09 11:47:13", "instrumented" : 28, "covered" : 9,};
var merged_data = [];
