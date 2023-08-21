var data = {lines:[
{"lineNum":"    1","line":"#include \"../fuzzing_utilities.h\""},
{"lineNum":"    2","line":"#include \"../FuzzedDataProvider.h\""},
{"lineNum":"    3","line":"#include \"../../libspark/bpplus.h\""},
{"lineNum":"    4","line":"#include \"../../libspark/bpplus_proof.h\""},
{"lineNum":"    5","line":"#include <cassert>"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineCov","hits":"2","order":"137","possible_hits":"2",},
{"lineNum":"    9","line":"    FuzzedDataProvider fdp(buf, len);","class":"lineCov","hits":"1","order":"138","possible_hits":"1",},
{"lineNum":"   10","line":"    FuzzedSecp256k1Object fsp(&fdp);","class":"lineCov","hits":"1","order":"140","possible_hits":"1",},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"    /** Single Proof **/"},
{"lineNum":"   13","line":"    size_t N0 = fdp.ConsumeIntegral<size_t>();","class":"lineCov","hits":"1","order":"144","possible_hits":"1",},
{"lineNum":"   14","line":"    size_t M0 = fdp.ConsumeIntegral<size_t>();","class":"lineCov","hits":"1","order":"157","possible_hits":"1",},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"    // Generators"},
{"lineNum":"   17","line":"    GroupElement G0, H0;","class":"lineCov","hits":"1","order":"158","possible_hits":"1",},
{"lineNum":"   18","line":"    G0.randomize();","class":"lineCov","hits":"1","order":"175","possible_hits":"1",},
{"lineNum":"   19","line":"    H0.randomize();","class":"lineCov","hits":"1","order":"706","possible_hits":"1",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"    std::vector<GroupElement> Gi0, Hi0;","class":"lineCov","hits":"1","order":"713","possible_hits":"1",},
{"lineNum":"   22","line":"    size_t generators_needed = N0*M0;","class":"lineCov","hits":"1","order":"714","possible_hits":"1",},
{"lineNum":"   23","line":"    if (!spark::is_nonzero_power_of_2(generators_needed)) {","class":"lineCov","hits":"1","order":"715","possible_hits":"1",},
{"lineNum":"   24","line":"        generators_needed = 1 << (spark::log2(N0*M0) + 1);","class":"lineCov","hits":"1","order":"718","possible_hits":"1",},
{"lineNum":"   25","line":"    }","class":"lineCov","hits":"1","order":"723","possible_hits":"1",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"    Gi0.resize(generators_needed);","class":"lineCov","hits":"1","order":"724","possible_hits":"1",},
{"lineNum":"   28","line":"    Hi0.resize(generators_needed);","class":"lineCov","hits":"1","order":"725","possible_hits":"1",},
{"lineNum":"   29","line":"    for (size_t i=0; i < generators_needed; i++) {","class":"lineCov","hits":"2","order":"726","possible_hits":"2",},
{"lineNum":"   30","line":"        Gi0[i].randomize();","class":"lineCov","hits":"1","order":"727","possible_hits":"1",},
{"lineNum":"   31","line":"        Hi0[i].randomize();","class":"lineCov","hits":"1","order":"728","possible_hits":"1",},
{"lineNum":"   32","line":"    }","class":"lineCov","hits":"1","order":"729","possible_hits":"1",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    // Commitments"},
{"lineNum":"   35","line":"    std::vector<Scalar> v, r;","class":"lineCov","hits":"1","order":"730","possible_hits":"1",},
{"lineNum":"   36","line":"    v = fsp.GetScalars(M0);","class":"lineCov","hits":"1","order":"731","possible_hits":"1",},
{"lineNum":"   37","line":"    r = fsp.GetScalars(M0);","class":"lineCov","hits":"1","order":"749","possible_hits":"1",},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    std::vector<GroupElement> C0;","class":"lineCov","hits":"1","order":"750","possible_hits":"1",},
{"lineNum":"   40","line":"    for (size_t i=0; i < M0; i++) {","class":"linePartCov","hits":"1","order":"751","possible_hits":"2",},
{"lineNum":"   41","line":"        C0[i] = G0*v[i] + H0*r[i];","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"    }"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    spark::BPPlus bpplus0(G0, H0, Gi0, Hi0, N0);","class":"lineCov","hits":"1","order":"752","possible_hits":"1",},
{"lineNum":"   45","line":"    spark::BPPlusProof proof0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"    bpplus0.prove(v, r, C0, proof0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    assert(bpplus0.verify(C0, proof0));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"    /** End of Single proof fuzz test**/"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    /** Batch Proof **/"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    size_t N1 = fdp.ConsumeIntegral<size_t>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"    size_t B = fdp.ConsumeIntegral<size_t>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"    std::vector<uint8_t> sizes = fdp.ConsumeRemainingBytes<uint8_t>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    // Generators"},
{"lineNum":"   57","line":"    GroupElement G1, H1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"    G1.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"    H1.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    std::vector<GroupElement> Gi1, Hi1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"    Gi1.resize(8*N1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"    Hi1.resize(8*N1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"    for (size_t i=0; i < 8*N1; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   65","line":"        Hi1[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"        Gi1[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    spark::BPPlus bpplus1(G1, H1, Gi1, Hi1, N1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    std::vector<spark::BPPlusProof> proofs;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    proofs.resize(B);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"    std::vector<std::vector<GroupElement>> C1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    for (size_t i=0; i < B; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":"        size_t M = sizes[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"        std::vector<Scalar> v, r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"        v.resize(M);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"        r.resize(M);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"        std::vector<GroupElement> C_;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"        C_.resize(M);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"        for (size_t j=0; j < M; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   82","line":"            v[j] = Scalar(uint64_t(j));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   83","line":"            r[j].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"            C_[j] = G1*v[j] + H1*r[j];","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   85","line":"        }"},
{"lineNum":"   86","line":"        C1.emplace_back(C_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"        bpplus1.prove(v, r, C_, proofs[i]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   89","line":"    assert(bpplus1.verify(C1, proofs));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    /** End of Batch proof fuzz test **/"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    return 0;"},
{"lineNum":"   94","line":"}","class":"lineNoCov","hits":"0","possible_hits":"7",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bpplus_hfuzz_debug", "date" : "2023-08-17 17:11:33", "instrumented" : 62, "covered" : 25,};
var merged_data = [];
