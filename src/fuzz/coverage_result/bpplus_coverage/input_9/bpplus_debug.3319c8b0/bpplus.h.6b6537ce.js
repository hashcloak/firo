var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_LIBSPARK_BPPLUS_H"},
{"lineNum":"    2","line":"#define FIRO_LIBSPARK_BPPLUS_H"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"bpplus_proof.h\""},
{"lineNum":"    5","line":"#include <secp256k1/include/MultiExponent.h>"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"namespace spark {"},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"std::size_t log2(std::size_t n);"},
{"lineNum":"   10","line":"bool is_nonzero_power_of_2(std::size_t n);"},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"class BPPlus {","class":"lineCov","hits":"2","order":"2021","possible_hits":"2",},
{"lineNum":"   13","line":"public:"},
{"lineNum":"   14","line":"    BPPlus("},
{"lineNum":"   15","line":"        const GroupElement& G,"},
{"lineNum":"   16","line":"        const GroupElement& H,"},
{"lineNum":"   17","line":"        const std::vector<GroupElement>& Gi,"},
{"lineNum":"   18","line":"        const std::vector<GroupElement>& Hi,"},
{"lineNum":"   19","line":"        const std::size_t N);"},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"    void prove(const std::vector<Scalar>& unpadded_v, const std::vector<Scalar>& unpadded_r, const std::vector<GroupElement>& unpadded_C, BPPlusProof& proof);"},
{"lineNum":"   22","line":"    bool verify(const std::vector<GroupElement>& unpadded_C, const BPPlusProof& proof); // single proof"},
{"lineNum":"   23","line":"    bool verify(const std::vector<std::vector<GroupElement>>& unpadded_C, const std::vector<BPPlusProof>& proofs); // batch of proofs"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"private:"},
{"lineNum":"   26","line":"    GroupElement G;"},
{"lineNum":"   27","line":"    GroupElement H;"},
{"lineNum":"   28","line":"    std::vector<GroupElement> Gi;"},
{"lineNum":"   29","line":"    std::vector<GroupElement> Hi;"},
{"lineNum":"   30","line":"    std::size_t N;"},
{"lineNum":"   31","line":"    Scalar TWO_N_MINUS_ONE;"},
{"lineNum":"   32","line":"};"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"}"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bpplus_debug", "date" : "2023-08-25 16:08:02", "instrumented" : 1, "covered" : 1,};
var merged_data = [];
