var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_LIBSPARK_BPPLUS_PROOF_H"},
{"lineNum":"    2","line":"#define FIRO_LIBSPARK_BPPLUS_PROOF_H"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"params.h\""},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"namespace spark {"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"class BPPlusProof{","class":"lineCov","hits":"6","order":"1096","possible_hits":"6",},
{"lineNum":"    9","line":"public:"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"    static inline int int_log2(std::size_t number) {"},
{"lineNum":"   12","line":"        assert(number != 0);"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"        int l2 = 0;"},
{"lineNum":"   15","line":"        while ((number >>= 1) != 0)"},
{"lineNum":"   16","line":"            l2++;"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"        return l2;"},
{"lineNum":"   19","line":"    }"},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"    inline std::size_t memoryRequired() const {"},
{"lineNum":"   22","line":"        return 3*GroupElement::memoryRequired() + 3*Scalar::memoryRequired() + L.size()*GroupElement::memoryRequired() + R.size()*GroupElement::memoryRequired();"},
{"lineNum":"   23","line":"    }"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"    ADD_SERIALIZE_METHODS;"},
{"lineNum":"   26","line":"    template <typename Stream, typename Operation>"},
{"lineNum":"   27","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {"},
{"lineNum":"   28","line":"        READWRITE(A);"},
{"lineNum":"   29","line":"        READWRITE(A1);"},
{"lineNum":"   30","line":"        READWRITE(B);"},
{"lineNum":"   31","line":"        READWRITE(r1);"},
{"lineNum":"   32","line":"        READWRITE(s1);"},
{"lineNum":"   33","line":"        READWRITE(d1);"},
{"lineNum":"   34","line":"        READWRITE(L);"},
{"lineNum":"   35","line":"        READWRITE(R);"},
{"lineNum":"   36","line":"    }"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    GroupElement A, A1, B;"},
{"lineNum":"   39","line":"    Scalar r1, s1, d1;"},
{"lineNum":"   40","line":"    std::vector<GroupElement> L, R;"},
{"lineNum":"   41","line":"};"},
{"lineNum":"   42","line":"}"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bpplus_debug", "date" : "2023-08-25 16:08:26", "instrumented" : 1, "covered" : 1,};
var merged_data = [];
