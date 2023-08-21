var data = {lines:[
{"lineNum":"    1","line":"#include \"fuzzing_utilities.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"FuzzedSecp256k1Object::FuzzedSecp256k1Object(FuzzedDataProvider *fdp) {","class":"lineCov","hits":"2","order":"141","possible_hits":"2",},
{"lineNum":"    4","line":"    this->fdp = fdp;","class":"lineCov","hits":"1","order":"142","possible_hits":"1",},
{"lineNum":"    5","line":"}","class":"linePartCov","hits":"1","order":"143","possible_hits":"2",},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"secp_primitives::GroupElement FuzzedSecp256k1Object::GetGroupElement() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    8","line":"    char* x = (char *)this->fdp->ConsumeBytes<uint8_t>(256).data();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    9","line":"    char* y = (char *)this->fdp->ConsumeBytes<uint8_t>(256).data();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   10","line":"    secp_primitives::GroupElement ge = secp_primitives::GroupElement(x, y);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"    return ge;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   13","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"secp_primitives::Scalar FuzzedSecp256k1Object::GetScalar() {","class":"lineCov","hits":"2","order":"740","possible_hits":"2",},
{"lineNum":"   16","line":"    uint64_t value = this->fdp->ConsumeIntegral<uint64_t>();","class":"lineCov","hits":"1","order":"741","possible_hits":"1",},
{"lineNum":"   17","line":"    secp_primitives::Scalar s = secp_primitives::Scalar(value);","class":"lineCov","hits":"1","order":"742","possible_hits":"1",},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"    return s;","class":"lineCov","hits":"1","order":"743","possible_hits":"1",},
{"lineNum":"   20","line":"}","class":"lineCov","hits":"1","order":"744","possible_hits":"1",},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"secp_primitives::GroupElement FuzzedSecp256k1Object::GetMemberGroupElement() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   23","line":"    secp_primitives::GroupElement ge;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"    ge.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"    return ge;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"std::vector<secp_primitives::GroupElement> FuzzedSecp256k1Object::GetMemberGroupElements(size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   29","line":"    std::vector<secp_primitives::GroupElement> ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    ge_vec.resize(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"    for (size_t i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":"        ge_vec[i] = (GetMemberGroupElement());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   33","line":"    }"},
{"lineNum":"   34","line":"    return ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   35","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"std::vector<secp_primitives::GroupElement> FuzzedSecp256k1Object::GetRandomGroupVector(size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   38","line":"    std::vector<secp_primitives::GroupElement> result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"    result.resize(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    for (size_t i = 0; i < len; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   41","line":"        result[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    return result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"std::vector<secp_primitives::GroupElement> FuzzedSecp256k1Object::GetGroupElements(int len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   47","line":"    std::vector<secp_primitives::GroupElement> ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"    ge_vec.resize(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"    for (int i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   50","line":"        ge_vec.push_back(GetGroupElement());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    return ge_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"std::vector<secp_primitives::Scalar> FuzzedSecp256k1Object::GetScalars(int len) {","class":"lineCov","hits":"2","order":"735","possible_hits":"2",},
{"lineNum":"   57","line":"    std::vector<secp_primitives::Scalar> scalar_vec;","class":"lineCov","hits":"1","order":"736","possible_hits":"1",},
{"lineNum":"   58","line":"    scalar_vec.resize(len);","class":"lineCov","hits":"1","order":"737","possible_hits":"1",},
{"lineNum":"   59","line":"    for (int i = 0; i <= len; i++) {","class":"lineCov","hits":"2","order":"738","possible_hits":"2",},
{"lineNum":"   60","line":"        scalar_vec.push_back(GetScalar());","class":"linePartCov","hits":"1","order":"739","possible_hits":"2",},
{"lineNum":"   61","line":"    }"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    return scalar_vec;","class":"lineCov","hits":"1","order":"750","possible_hits":"1",},
{"lineNum":"   64","line":"}","class":"linePartCov","hits":"1","order":"751","possible_hits":"2",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"secp_primitives::Scalar FuzzedSecp256k1Object::GetScalar_modified() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":"    secp_primitives::Scalar s = secp_primitives::Scalar(this->fdp->ConsumeBytes<uint8_t>(256).data());","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   68","line":"    return s;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"std::vector<secp_primitives::Scalar> FuzzedSecp256k1Object::GetScalars_modified(int len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   72","line":"    std::vector<secp_primitives::Scalar> scalar_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"    scalar_vec.resize(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"    for (int i = 0; i <= len; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":"        scalar_vec.push_back(GetScalar_modified());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   76","line":"    }"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    return scalar_vec;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bpplus_hfuzz_debug", "date" : "2023-08-17 17:25:57", "instrumented" : 59, "covered" : 15,};
var merged_data = [];
