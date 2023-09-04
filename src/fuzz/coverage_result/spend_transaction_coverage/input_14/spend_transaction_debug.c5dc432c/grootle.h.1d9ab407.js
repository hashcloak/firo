var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_LIBSPARK_GROOTLE_H"},
{"lineNum":"    2","line":"#define FIRO_LIBSPARK_GROOTLE_H"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"grootle_proof.h\""},
{"lineNum":"    5","line":"#include <secp256k1/include/MultiExponent.h>"},
{"lineNum":"    6","line":"#include <random>"},
{"lineNum":"    7","line":"#include \"util.h\""},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"namespace spark {"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"class Grootle {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"public:"},
{"lineNum":"   14","line":"    Grootle("},
{"lineNum":"   15","line":"        const GroupElement& H,"},
{"lineNum":"   16","line":"        const std::vector<GroupElement>& Gi,"},
{"lineNum":"   17","line":"        const std::vector<GroupElement>& Hi,"},
{"lineNum":"   18","line":"        const std::size_t n,"},
{"lineNum":"   19","line":"        const std::size_t m"},
{"lineNum":"   20","line":"    );"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"    void prove(const std::size_t l,"},
{"lineNum":"   23","line":"        const Scalar& s,"},
{"lineNum":"   24","line":"        const std::vector<GroupElement>& S,"},
{"lineNum":"   25","line":"        const GroupElement& S1,"},
{"lineNum":"   26","line":"        const Scalar& v,"},
{"lineNum":"   27","line":"        const std::vector<GroupElement>& V,"},
{"lineNum":"   28","line":"        const GroupElement& V1,"},
{"lineNum":"   29","line":"        const std::vector<unsigned char>& root,"},
{"lineNum":"   30","line":"        GrootleProof& proof);"},
{"lineNum":"   31","line":"    bool verify(const std::vector<GroupElement>& S,"},
{"lineNum":"   32","line":"        const GroupElement& S1,"},
{"lineNum":"   33","line":"        const std::vector<GroupElement>& V,"},
{"lineNum":"   34","line":"        const GroupElement& V1,"},
{"lineNum":"   35","line":"        const std::vector<unsigned char>& root,"},
{"lineNum":"   36","line":"        const std::size_t size,"},
{"lineNum":"   37","line":"        const GrootleProof& proof); // single proof"},
{"lineNum":"   38","line":"    bool verify(const std::vector<GroupElement>& S,"},
{"lineNum":"   39","line":"        const std::vector<GroupElement>& S1,"},
{"lineNum":"   40","line":"        const std::vector<GroupElement>& V,"},
{"lineNum":"   41","line":"        const std::vector<GroupElement>& V1,"},
{"lineNum":"   42","line":"        const std::vector<std::vector<unsigned char>>& roots,"},
{"lineNum":"   43","line":"        const std::vector<std::size_t>& sizes,"},
{"lineNum":"   44","line":"        const std::vector<GrootleProof>& proofs); // batch of proofs"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"private:"},
{"lineNum":"   47","line":"    GroupElement H;"},
{"lineNum":"   48","line":"    std::vector<GroupElement> Gi;"},
{"lineNum":"   49","line":"    std::vector<GroupElement> Hi;"},
{"lineNum":"   50","line":"    std::size_t n;"},
{"lineNum":"   51","line":"    std::size_t m;"},
{"lineNum":"   52","line":"};"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"}"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "spend_transaction_debug", "date" : "2023-08-30 10:01:08", "instrumented" : 1, "covered" : 0,};
var merged_data = [];
