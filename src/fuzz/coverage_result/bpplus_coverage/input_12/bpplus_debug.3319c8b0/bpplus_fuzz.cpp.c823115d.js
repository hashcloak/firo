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
{"lineNum":"   13","line":"    size_t N0 = fdp.ConsumeIntegralInRange<size_t>(0,64);","class":"lineCov","hits":"1","order":"144","possible_hits":"1",},
{"lineNum":"   14","line":"    size_t M0 = fdp.ConsumeIntegral<size_t>();","class":"lineCov","hits":"1","order":"158","possible_hits":"1",},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"    N0 = 64;","class":"lineCov","hits":"1","order":"162","possible_hits":"1",},
{"lineNum":"   17","line":"    M0 = 4;","class":"lineCov","hits":"1","order":"163","possible_hits":"1",},
{"lineNum":"   18","line":"    // Generators"},
{"lineNum":"   19","line":"    GroupElement G0, H0;","class":"lineCov","hits":"1","order":"164","possible_hits":"1",},
{"lineNum":"   20","line":"    G0.randomize();","class":"lineCov","hits":"1","order":"181","possible_hits":"1",},
{"lineNum":"   21","line":"    H0.randomize();","class":"lineCov","hits":"1","order":"712","possible_hits":"1",},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"    std::vector<GroupElement> Gi0, Hi0;","class":"lineCov","hits":"1","order":"713","possible_hits":"1",},
{"lineNum":"   24","line":"    size_t generators_needed = N0*M0;","class":"lineCov","hits":"1","order":"714","possible_hits":"1",},
{"lineNum":"   25","line":"    if (!spark::is_nonzero_power_of_2(generators_needed)) {","class":"lineCov","hits":"1","order":"715","possible_hits":"1",},
{"lineNum":"   26","line":"        generators_needed = 1 << (spark::log2(N0*M0) + 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    Gi0.resize(generators_needed);","class":"lineCov","hits":"1","order":"718","possible_hits":"1",},
{"lineNum":"   30","line":"    Hi0.resize(generators_needed);","class":"lineCov","hits":"1","order":"719","possible_hits":"1",},
{"lineNum":"   31","line":"    for (size_t i=0; i < generators_needed; i++) {","class":"lineCov","hits":"2","order":"720","possible_hits":"2",},
{"lineNum":"   32","line":"        Gi0[i].randomize();","class":"lineCov","hits":"1","order":"721","possible_hits":"1",},
{"lineNum":"   33","line":"        Hi0[i].randomize();","class":"lineCov","hits":"1","order":"728","possible_hits":"1",},
{"lineNum":"   34","line":"    }","class":"lineCov","hits":"1","order":"729","possible_hits":"1",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    // Commitments"},
{"lineNum":"   37","line":"    std::vector<Scalar> v, r;","class":"lineCov","hits":"1","order":"730","possible_hits":"1",},
{"lineNum":"   38","line":"    v.resize(M0);","class":"lineCov","hits":"1","order":"731","possible_hits":"1",},
{"lineNum":"   39","line":"    r.resize(M0);","class":"lineCov","hits":"1","order":"741","possible_hits":"1",},
{"lineNum":"   40","line":"    // v = fsp.GetScalars(M0);"},
{"lineNum":"   41","line":"    // r = fsp.GetScalars(M0);"},
{"lineNum":"   42","line":"    for(int i = 0; i < M0; i++){","class":"lineCov","hits":"2","order":"742","possible_hits":"2",},
{"lineNum":"   43","line":"        v[i] = Scalar((uint64_t) rand());","class":"linePartCov","hits":"1","order":"743","possible_hits":"2",},
{"lineNum":"   44","line":"        r[i].randomize();","class":"lineCov","hits":"1","order":"752","possible_hits":"1",},
{"lineNum":"   45","line":"    }","class":"lineCov","hits":"1","order":"804","possible_hits":"1",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    std::vector<GroupElement> C0;","class":"lineCov","hits":"1","order":"805","possible_hits":"1",},
{"lineNum":"   48","line":"    C0.resize(M0);","class":"lineCov","hits":"1","order":"806","possible_hits":"1",},
{"lineNum":"   49","line":"    for (size_t i=0; i < M0; i++) {","class":"lineCov","hits":"2","order":"807","possible_hits":"2",},
{"lineNum":"   50","line":"        C0[i] = G0*v[i] + H0*r[i];","class":"linePartCov","hits":"1","order":"808","possible_hits":"2",},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    spark::BPPlus bpplus0(G0, H0, Gi0, Hi0, N0);","class":"lineCov","hits":"1","order":"1044","possible_hits":"1",},
{"lineNum":"   54","line":"    spark::BPPlusProof proof0;","class":"lineCov","hits":"1","order":"1095","possible_hits":"1",},
{"lineNum":"   55","line":"    bpplus0.prove(v, r, C0, proof0);","class":"lineCov","hits":"1","order":"1097","possible_hits":"1",},
{"lineNum":"   56","line":"    assert(bpplus0.verify(C0, proof0));","class":"lineCov","hits":"1","order":"1839","possible_hits":"1",},
{"lineNum":"   57","line":"    /** End of Single proof fuzz test**/"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    /** Batch Proof **/"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    size_t N1 = fdp.ConsumeIntegralInRange<size_t>(1,64);","class":"lineCov","hits":"1","order":"1982","possible_hits":"1",},
{"lineNum":"   62","line":"    size_t B = fdp.ConsumeIntegral<size_t>();","class":"lineCov","hits":"1","order":"1983","possible_hits":"1",},
{"lineNum":"   63","line":"    N1 = 64;","class":"lineCov","hits":"1","order":"1984","possible_hits":"1",},
{"lineNum":"   64","line":"    B = 5;","class":"lineCov","hits":"1","order":"1985","possible_hits":"1",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    std::vector<std::size_t> sizes;","class":"lineCov","hits":"1","order":"1986","possible_hits":"1",},
{"lineNum":"   67","line":"    sizes.resize(B);","class":"lineCov","hits":"1","order":"1987","possible_hits":"1",},
{"lineNum":"   68","line":"    for(int i = 0; i < B; i++){","class":"lineCov","hits":"2","order":"1988","possible_hits":"2",},
{"lineNum":"   69","line":"        sizes[i] = (fdp.ConsumeIntegral<std::size_t>() % 8) + 1 ; // otherwise it\'s \"Bad BPPlus statement!4\" line 102 bpplus.cpp since B = 5.(checked)","class":"lineCov","hits":"1","order":"1989","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":"    // sizes = fdp.ConsumeRemainingBytes<std::size_t>();"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    // Generators"},
{"lineNum":"   74","line":"    GroupElement G1, H1;","class":"lineCov","hits":"1","order":"1990","possible_hits":"1",},
{"lineNum":"   75","line":"    G1.randomize();","class":"lineCov","hits":"1","order":"1991","possible_hits":"1",},
{"lineNum":"   76","line":"    H1.randomize();","class":"lineCov","hits":"1","order":"1992","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    // std::size_t next_power = 1 << (uint(log2(B)) + 1);"},
{"lineNum":"   79","line":"    std::vector<GroupElement> Gi1, Hi1;","class":"lineCov","hits":"1","order":"1993","possible_hits":"1",},
{"lineNum":"   80","line":"    Gi1.resize(8*N1);","class":"lineCov","hits":"1","order":"1994","possible_hits":"1",},
{"lineNum":"   81","line":"    Hi1.resize(8*N1);","class":"lineCov","hits":"1","order":"1995","possible_hits":"1",},
{"lineNum":"   82","line":"    for (size_t i=0; i < 8*N1; i++) {","class":"lineCov","hits":"2","order":"1996","possible_hits":"2",},
{"lineNum":"   83","line":"        Hi1[i].randomize();","class":"lineCov","hits":"1","order":"1997","possible_hits":"1",},
{"lineNum":"   84","line":"        Gi1[i].randomize();","class":"lineCov","hits":"1","order":"1998","possible_hits":"1",},
{"lineNum":"   85","line":"    }","class":"lineCov","hits":"1","order":"1999","possible_hits":"1",},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"    spark::BPPlus bpplus1(G1, H1, Gi1, Hi1, N1);","class":"lineCov","hits":"1","order":"2000","possible_hits":"1",},
{"lineNum":"   88","line":"    std::vector<spark::BPPlusProof> proofs;","class":"lineCov","hits":"1","order":"2001","possible_hits":"1",},
{"lineNum":"   89","line":"    proofs.resize(B);","class":"lineCov","hits":"1","order":"2002","possible_hits":"1",},
{"lineNum":"   90","line":"    std::vector<std::vector<GroupElement>> C1;","class":"lineCov","hits":"1","order":"2003","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    for (size_t i=0; i < B; i++) {","class":"lineCov","hits":"2","order":"2004","possible_hits":"2",},
{"lineNum":"   93","line":"        std::size_t M = sizes[i];","class":"lineCov","hits":"1","order":"2005","possible_hits":"1",},
{"lineNum":"   94","line":"        std::vector<Scalar> v, r;","class":"lineCov","hits":"1","order":"2006","possible_hits":"1",},
{"lineNum":"   95","line":"        v.resize(M);","class":"lineCov","hits":"1","order":"2007","possible_hits":"1",},
{"lineNum":"   96","line":"        r.resize(M);","class":"lineCov","hits":"1","order":"2008","possible_hits":"1",},
{"lineNum":"   97","line":"        std::vector<GroupElement> C_;","class":"lineCov","hits":"1","order":"2009","possible_hits":"1",},
{"lineNum":"   98","line":"        C_.resize(M);","class":"lineCov","hits":"1","order":"2010","possible_hits":"1",},
{"lineNum":"   99","line":"        for (size_t j=0; j < M; j++) {","class":"lineCov","hits":"2","order":"2011","possible_hits":"2",},
{"lineNum":"  100","line":"            v[j] = Scalar(uint64_t(j));","class":"linePartCov","hits":"1","order":"2012","possible_hits":"2",},
{"lineNum":"  101","line":"            r[j].randomize();","class":"lineCov","hits":"1","order":"2013","possible_hits":"1",},
{"lineNum":"  102","line":"            C_[j] = G1*v[j] + H1*r[j];","class":"linePartCov","hits":"1","order":"2014","possible_hits":"2",},
{"lineNum":"  103","line":"        }"},
{"lineNum":"  104","line":"        C1.emplace_back(C_);","class":"lineCov","hits":"1","order":"2017","possible_hits":"1",},
{"lineNum":"  105","line":"        bpplus1.prove(v, r, C_, proofs[i]);","class":"lineCov","hits":"1","order":"2018","possible_hits":"1",},
{"lineNum":"  106","line":"    }","class":"linePartCov","hits":"1","order":"2019","possible_hits":"2",},
{"lineNum":"  107","line":"    assert(bpplus1.verify(C1, proofs));","class":"lineCov","hits":"1","order":"2020","possible_hits":"1",},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"    /** End of Batch proof fuzz test **/"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"    return 0;"},
{"lineNum":"  112","line":"}","class":"lineNoCov","hits":"0","possible_hits":"9",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bpplus_debug", "date" : "2023-08-25 16:08:20", "instrumented" : 74, "covered" : 71,};
var merged_data = [];
