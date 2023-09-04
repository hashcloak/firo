var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_LIBSPARK_SCHNORR_PROOF_H"},
{"lineNum":"    2","line":"#define FIRO_LIBSPARK_SCHNORR_PROOF_H"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"params.h\""},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"namespace spark {"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"class SchnorrProof{","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"    9","line":"public:"},
{"lineNum":"   10","line":"    inline std::size_t memoryRequired() const {"},
{"lineNum":"   11","line":"        return Scalar::memoryRequired() + GroupElement::memoryRequired();"},
{"lineNum":"   12","line":"    }"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"    ADD_SERIALIZE_METHODS;","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   15","line":"    template <typename Stream, typename Operation>"},
{"lineNum":"   16","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   17","line":"        READWRITE(A);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   18","line":"        READWRITE(t);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   19","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"4",},
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
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:36:33", "instrumented" : 6, "covered" : 0,};
var merged_data = [];
