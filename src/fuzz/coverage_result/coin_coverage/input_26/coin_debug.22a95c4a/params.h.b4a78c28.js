var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_LIBSPARK_PARAMS_H"},
{"lineNum":"    2","line":"#define FIRO_LIBSPARK_PARAMS_H"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"../secp256k1/include/Scalar.h\""},
{"lineNum":"    5","line":"#include \"../secp256k1/include/GroupElement.h\""},
{"lineNum":"    6","line":"#include \"../serialize.h\""},
{"lineNum":"    7","line":"#include \"../sync.h\""},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"using namespace secp_primitives;"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"namespace spark {"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"class Params {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   14","line":"public:"},
{"lineNum":"   15","line":"    static Params const* get_default();"},
{"lineNum":"   16","line":"    static Params const* get_test();"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"    const GroupElement& get_F() const;"},
{"lineNum":"   19","line":"    const GroupElement& get_G() const;"},
{"lineNum":"   20","line":"    const GroupElement& get_H() const;"},
{"lineNum":"   21","line":"    const GroupElement& get_U() const;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"    const std::size_t get_memo_bytes() const;"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"    std::size_t get_max_M_range() const;"},
{"lineNum":"   26","line":"    const std::vector<GroupElement>& get_G_range() const;"},
{"lineNum":"   27","line":"    const std::vector<GroupElement>& get_H_range() const;"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    std::size_t get_n_grootle() const;"},
{"lineNum":"   30","line":"    std::size_t get_m_grootle() const;"},
{"lineNum":"   31","line":"    const std::vector<GroupElement>& get_G_grootle() const;"},
{"lineNum":"   32","line":"    const std::vector<GroupElement>& get_H_grootle() const;"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"private:"},
{"lineNum":"   35","line":"    Params("},
{"lineNum":"   36","line":"        const std::size_t memo_bytes,"},
{"lineNum":"   37","line":"        const std::size_t max_M_range,"},
{"lineNum":"   38","line":"        const std::size_t n_grootle,"},
{"lineNum":"   39","line":"        const std::size_t m_grootle"},
{"lineNum":"   40","line":"    );"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"private:"},
{"lineNum":"   43","line":"    static CCriticalSection cs_instance;"},
{"lineNum":"   44","line":"    static std::unique_ptr<Params> instance;"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    // Global generators"},
{"lineNum":"   47","line":"    GroupElement F;"},
{"lineNum":"   48","line":"    GroupElement G;"},
{"lineNum":"   49","line":"    GroupElement H;"},
{"lineNum":"   50","line":"    GroupElement U;"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    // Coin parameters"},
{"lineNum":"   53","line":"    std::size_t memo_bytes;"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    // Range proof parameters"},
{"lineNum":"   56","line":"    std::size_t max_M_range;"},
{"lineNum":"   57","line":"    std::vector<GroupElement> G_range, H_range;"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    // One-of-many parameters"},
{"lineNum":"   60","line":"    std::size_t n_grootle, m_grootle;"},
{"lineNum":"   61","line":"    std::vector<GroupElement> G_grootle;"},
{"lineNum":"   62","line":"    std::vector<GroupElement> H_grootle;"},
{"lineNum":"   63","line":"};"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"}"},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug", "date" : "2023-08-28 08:54:09", "instrumented" : 1, "covered" : 0,};
var merged_data = [];
