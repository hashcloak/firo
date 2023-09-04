var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_LIBSPARK_GROOTLE_PROOF_H"},
{"lineNum":"    2","line":"#define FIRO_LIBSPARK_GROOTLE_PROOF_H"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"params.h\""},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"namespace spark {"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"class GrootleProof {","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"    9","line":"public:"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"    inline std::size_t memoryRequired() const {"},
{"lineNum":"   12","line":"        return 2*GroupElement::memoryRequired() + X.size()*GroupElement::memoryRequired() + X1.size()*GroupElement::memoryRequired() + f.size()*Scalar::memoryRequired() + 3*Scalar::memoryRequired();"},
{"lineNum":"   13","line":"    }"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"    inline std::size_t memoryRequired(int n, int m) const {"},
{"lineNum":"   16","line":"        return 2*GroupElement::memoryRequired() + 2*m*GroupElement::memoryRequired() + m*(n-1)*Scalar::memoryRequired() + 3*Scalar::memoryRequired();"},
{"lineNum":"   17","line":"    }"},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"    ADD_SERIALIZE_METHODS;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   20","line":"    template <typename Stream, typename Operation>"},
{"lineNum":"   21","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":"        READWRITE(A);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":"        READWRITE(B);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"        READWRITE(X);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"        READWRITE(X1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"        READWRITE(f);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":"        READWRITE(z);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"        READWRITE(zS);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"        READWRITE(zV);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"public:"},
{"lineNum":"   33","line":"    GroupElement A;"},
{"lineNum":"   34","line":"    GroupElement B;"},
{"lineNum":"   35","line":"    std::vector<GroupElement> X;"},
{"lineNum":"   36","line":"    std::vector<GroupElement> X1;"},
{"lineNum":"   37","line":"    std::vector<Scalar> f;"},
{"lineNum":"   38","line":"    Scalar z;"},
{"lineNum":"   39","line":"    Scalar zS;"},
{"lineNum":"   40","line":"    Scalar zV;"},
{"lineNum":"   41","line":"};"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"}"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "spend_transaction_debug", "date" : "2023-08-30 10:00:59", "instrumented" : 12, "covered" : 0,};
var merged_data = [];
