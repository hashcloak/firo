var data = {lines:[
{"lineNum":"    1","line":"#include \"schnorr.h\""},
{"lineNum":"    2","line":"#include \"transcript.h\""},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"namespace spark {"},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"Schnorr::Schnorr(const GroupElement& G_):"},
{"lineNum":"    7","line":"    G(G_) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"    8","line":"}","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"Scalar Schnorr::challenge("},
{"lineNum":"   11","line":"        const std::vector<GroupElement>& Y,"},
{"lineNum":"   12","line":"        const GroupElement& A) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   13","line":"    Transcript transcript(LABEL_TRANSCRIPT_SCHNORR);","class":"linePartCov","hits":"1","possible_hits":"4",},
{"lineNum":"   14","line":"    transcript.add(\"G\", G);","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   15","line":"    transcript.add(\"Y\", Y);","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   16","line":"    transcript.add(\"A\", A);","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"    return transcript.challenge(\"c\");","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   19","line":"}","class":"linePartCov","hits":"1","possible_hits":"6",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"void Schnorr::prove(const Scalar& y, const GroupElement& Y, SchnorrProof& proof) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":"    const std::vector<Scalar> y_vector = { y };","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"   23","line":"    const std::vector<GroupElement> Y_vector = { Y };","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   24","line":"    prove(y_vector, Y_vector, proof);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"}","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"void Schnorr::prove(const std::vector<Scalar>& y, const std::vector<GroupElement>& Y, SchnorrProof& proof) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   28","line":"    const std::size_t n = y.size();","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    // Check statement validity"},
{"lineNum":"   31","line":"    if (y.size() != Y.size()) {","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   32","line":"        throw std::invalid_argument(\"Bad Schnorr statement!\");","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   33","line":"    }"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    for (std::size_t i = 0; i < n; i++) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   36","line":"        if (G*y[i] != Y[i]) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   37","line":"            throw std::invalid_argument(\"Bad Schnorr statement!\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   38","line":"        }"},
{"lineNum":"   39","line":"    }","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    Scalar r;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   42","line":"    r.randomize();","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   43","line":"    proof.A = G*r;","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    const Scalar c = challenge(Y, proof.A);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   46","line":"    Scalar c_power(c);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    proof.t = r;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   49","line":"    for (std::size_t i = 0; i < n; i++) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   50","line":"        proof.t += y[i].negate()*c_power;","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   51","line":"        c_power *= c;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   52","line":"    }","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   53","line":"}","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"bool Schnorr::verify(const GroupElement& Y, const SchnorrProof& proof) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":"    const std::vector<GroupElement> Y_vector = { Y };","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"   57","line":"    return verify(Y_vector, proof);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"bool Schnorr::verify(const std::vector<GroupElement>& Y, const SchnorrProof& proof) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   61","line":"    const std::size_t n = Y.size();","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    std::vector<GroupElement> points;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   64","line":"    points.reserve(n + 2);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   65","line":"    std::vector<Scalar> scalars;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   66","line":"    scalars.reserve(n + 2);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    points.emplace_back(G);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   69","line":"    scalars.emplace_back(proof.t);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   70","line":"    points.emplace_back(proof.A);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   71","line":"    scalars.emplace_back(Scalar(uint64_t(1)).negate());","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    const Scalar c = challenge(Y, proof.A);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   74","line":"    Scalar c_power(c);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   75","line":"    for (std::size_t i = 0; i < n; i++) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   76","line":"        points.emplace_back(Y[i]);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   77","line":"        scalars.emplace_back(c_power);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   78","line":"        c_power *= c;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   79","line":"    }","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    MultiExponent result(points, scalars);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   82","line":"    return result.get_multiple().isInfinity();","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   83","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:34:42", "instrumented" : 57, "covered" : 44,};
var merged_data = [];
