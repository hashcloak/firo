var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_LIBSPARK_SCHNORR_PROOF_H"},
{"lineNum":"    2","line":"#define FIRO_LIBSPARK_SCHNORR_PROOF_H"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"params.h\""},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"namespace spark {"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"class SchnorrProof{","class":"linePartCov","hits":"2","order":"750","possible_hits":"4",},
{"lineNum":"    9","line":"public:"},
{"lineNum":"   10","line":"    inline std::size_t memoryRequired() const {"},
{"lineNum":"   11","line":"        return Scalar::memoryRequired() + GroupElement::memoryRequired();"},
{"lineNum":"   12","line":"    }"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"    ADD_SERIALIZE_METHODS;","class":"lineCov","hits":"4","order":"1133","possible_hits":"4",},
{"lineNum":"   15","line":"    template <typename Stream, typename Operation>"},
{"lineNum":"   16","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {","class":"lineCov","hits":"4","order":"1136","possible_hits":"4",},
{"lineNum":"   17","line":"        READWRITE(A);","class":"lineCov","hits":"2","order":"1137","possible_hits":"2",},
{"lineNum":"   18","line":"        READWRITE(t);","class":"lineCov","hits":"2","order":"1151","possible_hits":"2",},
{"lineNum":"   19","line":"    }","class":"linePartCov","hits":"2","order":"1166","possible_hits":"4",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"public:"},
{"lineNum":"   22","line":"    GroupElement A;"},
{"lineNum":"   23","line":"    Scalar t;"},
{"lineNum":"   24","line":"};"},
{"lineNum":"   25","line":"}"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "schnorr_hfuzz_debug", "date" : "2023-08-14 14:03:13", "instrumented" : 6, "covered" : 6,};
var merged_data = [];
