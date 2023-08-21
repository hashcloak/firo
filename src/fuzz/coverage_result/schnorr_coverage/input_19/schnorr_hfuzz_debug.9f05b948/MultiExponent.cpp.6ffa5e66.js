var data = {lines:[
{"lineNum":"    1","line":"#include \"../../include/MultiExponent.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"#include \"../include/secp256k1.h\""},
{"lineNum":"    4","line":"#include \"../field.h\""},
{"lineNum":"    5","line":"#include \"../field_impl.h\""},
{"lineNum":"    6","line":"#include \"../group.h\""},
{"lineNum":"    7","line":"#include \"../group_impl.h\""},
{"lineNum":"    8","line":"#include \"../scalar.h\""},
{"lineNum":"    9","line":"#include \"../scalar_impl.h\""},
{"lineNum":"   10","line":"#include \"../ecmult.h\""},
{"lineNum":"   11","line":"#include \"../ecmult_impl.h\""},
{"lineNum":"   12","line":"#include \"../scratch_impl.h\""},
{"lineNum":"   13","line":"#include \"../ecmult_impl.h\""},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"typedef struct {"},
{"lineNum":"   17","line":"    secp256k1_scalar *sc;"},
{"lineNum":"   18","line":"    secp256k1_gej *pt;"},
{"lineNum":"   19","line":"} ecmult_multi_data;"},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"int ecmult_multi_callback(secp256k1_scalar *sc, secp256k1_gej *pt, size_t idx, void *cbdata) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":"    ecmult_multi_data *data = (ecmult_multi_data*) cbdata;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":"    *sc = data->sc[idx];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"    *pt = data->pt[idx];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"    return 1;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   26","line":"}"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"namespace secp_primitives {"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"MultiExponent::MultiExponent(const MultiExponent& other)"},
{"lineNum":"   31","line":"        : sc_(new secp256k1_scalar[other.n_points])","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"        , pt_(new secp256k1_gej[other.n_points])","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"        , n_points(other.n_points)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   35","line":"    for(int i = 0; i < n_points; ++i)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":"    {"},
{"lineNum":"   37","line":"        (reinterpret_cast<secp256k1_scalar *>(sc_))[i] = (reinterpret_cast<secp256k1_scalar *>(other.sc_))[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"        (reinterpret_cast<secp256k1_gej *>(pt_))[i] = (reinterpret_cast<secp256k1_gej *>(other.pt_))[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"    }"},
{"lineNum":"   40","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"MultiExponent::MultiExponent(const std::vector<GroupElement>& generators, const std::vector<Scalar>& powers){","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"    sc_ = new secp256k1_scalar[powers.size()];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"    pt_ = new secp256k1_gej[generators.size()];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"    n_points = generators.size();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"    for(int i = 0; i < n_points; ++i)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   47","line":"    {"},
{"lineNum":"   48","line":"        (reinterpret_cast<secp256k1_scalar *>(sc_))[i] = *reinterpret_cast<const secp256k1_scalar *>(powers[i].get_value());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"        (reinterpret_cast<secp256k1_gej *>(pt_))[i] = *reinterpret_cast<const secp256k1_gej *>(generators[i].get_value());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"MultiExponent::~MultiExponent(){","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":"    delete []reinterpret_cast<secp256k1_scalar *>(sc_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"    delete []reinterpret_cast<secp256k1_gej *>(pt_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"GroupElement MultiExponent::get_multiple() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   59","line":"    secp256k1_gej r;"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    ecmult_multi_data data;"},
{"lineNum":"   62","line":"    data.sc = reinterpret_cast<secp256k1_scalar *>(sc_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"    data.pt = reinterpret_cast<secp256k1_gej *>(pt_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    secp256k1_scratch *scratch;"},
{"lineNum":"   66","line":"    if (n_points > ECMULT_PIPPENGER_THRESHOLD) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"        int bucket_window = secp256k1_pippenger_bucket_window(n_points);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"        size_t scratch_size = secp256k1_pippenger_scratch_size(n_points, bucket_window);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"        scratch = secp256k1_scratch_create(NULL, scratch_size + PIPPENGER_SCRATCH_OBJECTS*ALIGNMENT);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    } else {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"        size_t scratch_size = secp256k1_strauss_scratch_size(n_points);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"        scratch = secp256k1_scratch_create(NULL, scratch_size + STRAUSS_SCRATCH_OBJECTS*ALIGNMENT);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    secp256k1_ecmult_context ctx;"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"    secp256k1_ecmult_multi_var(&ctx, scratch, &r, NULL, ecmult_multi_callback, &data, n_points);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    secp256k1_scratch_destroy(scratch);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    return  reinterpret_cast<secp256k1_scalar *>(&r);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"}"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"}// namespace secp_primitives"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "schnorr_hfuzz_debug", "date" : "2023-08-14 14:04:42", "instrumented" : 38, "covered" : 0,};
var merged_data = [];
