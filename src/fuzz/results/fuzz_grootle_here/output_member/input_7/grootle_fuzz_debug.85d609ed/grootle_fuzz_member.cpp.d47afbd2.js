var data = {lines:[
{"lineNum":"    1","line":"#include \"../fuzzing_utilities.h\""},
{"lineNum":"    2","line":"#include \"../FuzzedDataProvider.h\""},
{"lineNum":"    3","line":"#include \"../../libspark/grootle.h\""},
{"lineNum":"    4","line":"#include \"../../libspark/grootle_proof.h\""},
{"lineNum":"    5","line":"#include <cassert>"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineCov","hits":"2","order":"1","possible_hits":"2",},
{"lineNum":"    8","line":"    FuzzedDataProvider fdp(buf, len);","class":"lineCov","hits":"1","order":"2","possible_hits":"1",},
{"lineNum":"    9","line":"    FuzzedSecp256k1Object fsp(&fdp);","class":"lineCov","hits":"1","order":"4","possible_hits":"1",},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"    std::size_t n = fdp.ConsumeIntegralInRange<size_t>(2, 65535);","class":"lineCov","hits":"1","order":"8","possible_hits":"1",},
{"lineNum":"   12","line":"    std::size_t m = fdp.ConsumeIntegralInRange<size_t>(2, 65535);","class":"lineCov","hits":"1","order":"22","possible_hits":"1",},
{"lineNum":"   13","line":"    std::size_t N = (size_t) std::pow(n,m);","class":"lineCov","hits":"1","order":"23","possible_hits":"1",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"    GroupElement H;","class":"lineCov","hits":"1","order":"24","possible_hits":"1",},
{"lineNum":"   16","line":"    H.randomize();","class":"lineCov","hits":"1","order":"25","possible_hits":"1",},
{"lineNum":"   17","line":"    std::vector<GroupElement> Gi = fsp.GetRandomGroupVector(n*m);","class":"lineCov","hits":"1","order":"26","possible_hits":"1",},
{"lineNum":"   18","line":"    std::vector<GroupElement> Hi = fsp.GetRandomGroupVector(n*m);","class":"lineCov","hits":"1","order":"35","possible_hits":"1",},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"    size_t commit_size = fdp.ConsumeIntegralInRange<size_t>(1, N);","class":"lineCov","hits":"1","order":"36","possible_hits":"1",},
{"lineNum":"   21","line":"    std::vector<GroupElement> S = fsp.GetRandomGroupVector(commit_size);","class":"lineCov","hits":"1","order":"37","possible_hits":"1",},
{"lineNum":"   22","line":"    std::vector<GroupElement> V = fsp.GetRandomGroupVector(commit_size);","class":"lineCov","hits":"1","order":"38","possible_hits":"1",},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"    std::vector<uint8_t> indexes = fdp.ConsumeBytes<uint8_t>(N);","class":"lineCov","hits":"1","order":"39","possible_hits":"1",},
{"lineNum":"   25","line":"    std::vector<size_t> sizes;","class":"lineCov","hits":"1","order":"58","possible_hits":"1",},
{"lineNum":"   26","line":"    sizes.resize(N);","class":"lineCov","hits":"1","order":"59","possible_hits":"1",},
{"lineNum":"   27","line":"    for(size_t i=0; i < N; i++) {","class":"lineCov","hits":"2","order":"60","possible_hits":"2",},
{"lineNum":"   28","line":"        sizes[i] = fdp.ConsumeIntegralInRange<size_t>(0, N);","class":"lineCov","hits":"1","order":"61","possible_hits":"1",},
{"lineNum":"   29","line":"    }"},
{"lineNum":"   30","line":"    std::vector<GroupElement> S1, V1;","class":"lineCov","hits":"1","order":"62","possible_hits":"1",},
{"lineNum":"   31","line":"    std::vector<std::vector<unsigned char>> roots;","class":"lineCov","hits":"1","order":"63","possible_hits":"1",},
{"lineNum":"   32","line":"    std::vector<Scalar> s, v;","class":"lineCov","hits":"1","order":"64","possible_hits":"1",},
{"lineNum":"   33","line":"    for (std::size_t index : indexes) {","class":"linePartCov","hits":"1","order":"65","possible_hits":"2",},
{"lineNum":"   34","line":"        Scalar s_, v_;","class":"lineCov","hits":"1","order":"66","possible_hits":"1",},
{"lineNum":"   35","line":"        s_ = fsp.GetScalar();","class":"linePartCov","hits":"1","order":"67","possible_hits":"2",},
{"lineNum":"   36","line":"        v_ = fsp.GetScalar();","class":"linePartCov","hits":"1","order":"76","possible_hits":"2",},
{"lineNum":"   37","line":"        s.emplace_back(s_);","class":"lineCov","hits":"1","order":"77","possible_hits":"1",},
{"lineNum":"   38","line":"        v.emplace_back(v_);","class":"lineCov","hits":"1","order":"78","possible_hits":"1",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"        S1.emplace_back(S[index]);","class":"lineCov","hits":"1","order":"79","possible_hits":"1",},
{"lineNum":"   41","line":"        V1.emplace_back(V[index]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"        S[index] += H*s_;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":"        V[index] += H*v_;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"        Scalar temp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"        temp = fsp.GetScalar();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   48","line":"        std::vector<unsigned char> root;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"        root.reserve(spark::SCALAR_ENCODING);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"        temp.serialize(root.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"        roots.emplace_back(root);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    spark::Grootle grootle(H, Gi, Hi, n, m);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"    std::vector<spark::GrootleProof> proofs;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    for (size_t i=0; i < indexes.size(); i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   58","line":"        proofs.emplace_back();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"        std::vector<GroupElement> S_(S.begin() + commit_size - sizes[i], S.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"        std::vector<GroupElement> V_(V.begin() + commit_size - sizes[i], V.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"        grootle.prove(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"            indexes[i] - (commit_size - sizes[i]),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"            s[i],","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"            S_,"},
{"lineNum":"   66","line":"            S1[i],","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"            v[i],","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"            V_,"},
{"lineNum":"   69","line":"            V1[i],","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"            roots[i],","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"            proofs.back()","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"        );"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"        assert(grootle.verify(S, S1[i], V, V1[i], roots[i], sizes[i], proofs.back()));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    assert(grootle.verify(S, S1, V, V1, roots, sizes, proofs));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    // Add an invalid proof"},
{"lineNum":"   81","line":"    proofs.emplace_back(proofs.back());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    S1.emplace_back(S1.back());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    V1.emplace_back(V1.back());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"    S1.back().randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"    sizes.emplace_back(sizes.back());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"    assert(!grootle.verify(S, S1, V, V1, roots, sizes, proofs));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    return 0;"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"}","class":"lineNoCov","hits":"0","possible_hits":"11",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "grootle_fuzz_debug", "date" : "2023-08-24 10:18:40", "instrumented" : 62, "covered" : 28,};
var merged_data = [];
