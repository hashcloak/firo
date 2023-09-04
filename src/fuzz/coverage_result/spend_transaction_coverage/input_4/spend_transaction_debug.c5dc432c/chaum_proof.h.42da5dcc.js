var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_LIBSPARK_CHAUM_PROOF_H"},
{"lineNum":"    2","line":"#define FIRO_LIBSPARK_CHAUM_PROOF_H"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"params.h\""},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"namespace spark {"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"class ChaumProof{","class":"linePartCov","hits":"2","order":"1620","possible_hits":"6",},
{"lineNum":"    9","line":"public:"},
{"lineNum":"   10","line":"    inline std::size_t memoryRequired() const {"},
{"lineNum":"   11","line":"        return GroupElement::memoryRequired() + A2.size()*GroupElement::memoryRequired() + t1.size()*Scalar::memoryRequired() + 2*Scalar::memoryRequired();"},
{"lineNum":"   12","line":"    }"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"    ADD_SERIALIZE_METHODS;"},
{"lineNum":"   15","line":"    template <typename Stream, typename Operation>"},
{"lineNum":"   16","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {"},
{"lineNum":"   17","line":"        READWRITE(A1);"},
{"lineNum":"   18","line":"        READWRITE(A2);"},
{"lineNum":"   19","line":"        READWRITE(t1);"},
{"lineNum":"   20","line":"        READWRITE(t2);"},
{"lineNum":"   21","line":"        READWRITE(t3);"},
{"lineNum":"   22","line":"    }"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"public:"},
{"lineNum":"   25","line":"    GroupElement A1;"},
{"lineNum":"   26","line":"    std::vector<GroupElement> A2;"},
{"lineNum":"   27","line":"    std::vector<Scalar> t1;"},
{"lineNum":"   28","line":"    Scalar t2, t3;"},
{"lineNum":"   29","line":"};"},
{"lineNum":"   30","line":"}"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "spend_transaction_debug", "date" : "2023-08-30 10:00:38", "instrumented" : 1, "covered" : 1,};
var merged_data = [];
