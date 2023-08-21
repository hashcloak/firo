var data = {lines:[
{"lineNum":"    1","line":"#include \"chaum.h\""},
{"lineNum":"    2","line":"#include \"transcript.h\""},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"namespace spark {"},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"Chaum::Chaum(const GroupElement& F_, const GroupElement& G_, const GroupElement& H_, const GroupElement& U_):"},
{"lineNum":"    7","line":"    F(F_), G(G_), H(H_), U(U_) {","class":"lineCov","hits":"2","order":"1120","possible_hits":"2",},
{"lineNum":"    8","line":"}","class":"linePartCov","hits":"1","order":"1121","possible_hits":"2",},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"Scalar Chaum::challenge("},
{"lineNum":"   11","line":"    const Scalar& mu,"},
{"lineNum":"   12","line":"    const std::vector<GroupElement>& S,"},
{"lineNum":"   13","line":"    const std::vector<GroupElement>& T,"},
{"lineNum":"   14","line":"    const GroupElement& A1,"},
{"lineNum":"   15","line":"    const std::vector<GroupElement>& A2"},
{"lineNum":"   16","line":") {","class":"lineCov","hits":"2","order":"1160","possible_hits":"2",},
{"lineNum":"   17","line":"    Transcript transcript(LABEL_TRANSCRIPT_CHAUM);","class":"linePartCov","hits":"1","order":"1161","possible_hits":"4",},
{"lineNum":"   18","line":"    transcript.add(\"F\", F);","class":"linePartCov","hits":"1","order":"1211","possible_hits":"2",},
{"lineNum":"   19","line":"    transcript.add(\"G\", G);","class":"linePartCov","hits":"1","order":"1233","possible_hits":"2",},
{"lineNum":"   20","line":"    transcript.add(\"H\", H);","class":"linePartCov","hits":"1","order":"1234","possible_hits":"2",},
{"lineNum":"   21","line":"    transcript.add(\"U\", U);","class":"linePartCov","hits":"1","order":"1235","possible_hits":"2",},
{"lineNum":"   22","line":"    transcript.add(\"mu\", mu);","class":"linePartCov","hits":"1","order":"1236","possible_hits":"2",},
{"lineNum":"   23","line":"    transcript.add(\"S\", S);","class":"linePartCov","hits":"1","order":"1245","possible_hits":"2",},
{"lineNum":"   24","line":"    transcript.add(\"T\", T);","class":"linePartCov","hits":"1","order":"1257","possible_hits":"2",},
{"lineNum":"   25","line":"    transcript.add(\"A1\", A1);","class":"linePartCov","hits":"1","order":"1258","possible_hits":"2",},
{"lineNum":"   26","line":"    transcript.add(\"A2\", A2);","class":"linePartCov","hits":"1","order":"1259","possible_hits":"2",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    return transcript.challenge(\"c\");","class":"linePartCov","hits":"1","order":"1260","possible_hits":"2",},
{"lineNum":"   29","line":"}","class":"linePartCov","hits":"1","order":"1292","possible_hits":"12",},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"void Chaum::prove("},
{"lineNum":"   32","line":"    const Scalar& mu,"},
{"lineNum":"   33","line":"    const std::vector<Scalar>& x,"},
{"lineNum":"   34","line":"    const std::vector<Scalar>& y,"},
{"lineNum":"   35","line":"    const std::vector<Scalar>& z,"},
{"lineNum":"   36","line":"    const std::vector<GroupElement>& S,"},
{"lineNum":"   37","line":"    const std::vector<GroupElement>& T,"},
{"lineNum":"   38","line":"    ChaumProof& proof"},
{"lineNum":"   39","line":") {","class":"lineCov","hits":"2","order":"1123","possible_hits":"2",},
{"lineNum":"   40","line":"    // Check statement validity"},
{"lineNum":"   41","line":"    std::size_t n = x.size();","class":"lineCov","hits":"1","order":"1124","possible_hits":"1",},
{"lineNum":"   42","line":"    if (!(y.size() == n && z.size() == n && S.size() == n && T.size() == n)) {","class":"lineCov","hits":"1","order":"1125","possible_hits":"1",},
{"lineNum":"   43","line":"        throw std::invalid_argument(\"Bad Chaum statement!\");","class":"linePartCov","hits":"1","order":"1538","possible_hits":"4",},
{"lineNum":"   44","line":"    }"},
{"lineNum":"   45","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineCov","hits":"2","order":"1126","possible_hits":"2",},
{"lineNum":"   46","line":"        if (!(F*x[i] + G*y[i] + H*z[i] == S[i] && T[i]*x[i] + G*y[i] == U)) {","class":"linePartCov","hits":"1","order":"1127","possible_hits":"2",},
{"lineNum":"   47","line":"            throw std::invalid_argument(\"Bad Chaum statement!\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   48","line":"        }"},
{"lineNum":"   49","line":"    }","class":"lineCov","hits":"1","order":"1139","possible_hits":"1",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    std::vector<Scalar> r;","class":"lineCov","hits":"1","order":"1140","possible_hits":"1",},
{"lineNum":"   52","line":"    r.resize(n);","class":"lineCov","hits":"1","order":"1141","possible_hits":"1",},
{"lineNum":"   53","line":"    std::vector<Scalar> s;","class":"lineCov","hits":"1","order":"1142","possible_hits":"1",},
{"lineNum":"   54","line":"    s.resize(n);","class":"lineCov","hits":"1","order":"1143","possible_hits":"1",},
{"lineNum":"   55","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineCov","hits":"2","order":"1144","possible_hits":"2",},
{"lineNum":"   56","line":"        r[i].randomize();","class":"lineCov","hits":"1","order":"1145","possible_hits":"1",},
{"lineNum":"   57","line":"        s[i].randomize();","class":"lineCov","hits":"1","order":"1146","possible_hits":"1",},
{"lineNum":"   58","line":"    }","class":"lineCov","hits":"1","order":"1147","possible_hits":"1",},
{"lineNum":"   59","line":"    Scalar t;","class":"lineCov","hits":"1","order":"1148","possible_hits":"1",},
{"lineNum":"   60","line":"    t.randomize();","class":"lineCov","hits":"1","order":"1149","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    proof.A1 = H*t;","class":"linePartCov","hits":"1","order":"1150","possible_hits":"2",},
{"lineNum":"   63","line":"    proof.A2.resize(n);","class":"lineCov","hits":"1","order":"1151","possible_hits":"1",},
{"lineNum":"   64","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineCov","hits":"2","order":"1152","possible_hits":"2",},
{"lineNum":"   65","line":"        proof.A1 += F*r[i] + G*s[i];","class":"linePartCov","hits":"1","order":"1153","possible_hits":"2",},
{"lineNum":"   66","line":"        proof.A2[i] = T[i]*r[i] + G*s[i];","class":"linePartCov","hits":"1","order":"1158","possible_hits":"2",},
{"lineNum":"   67","line":"    }"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    Scalar c = challenge(mu, S, T, proof.A1, proof.A2);","class":"lineCov","hits":"1","order":"1159","possible_hits":"1",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    proof.t1.resize(n);","class":"lineCov","hits":"1","order":"1296","possible_hits":"1",},
{"lineNum":"   72","line":"    proof.t3 = t;","class":"lineCov","hits":"1","order":"1297","possible_hits":"1",},
{"lineNum":"   73","line":"    Scalar c_power(c);","class":"lineCov","hits":"1","order":"1303","possible_hits":"1",},
{"lineNum":"   74","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineCov","hits":"2","order":"1304","possible_hits":"2",},
{"lineNum":"   75","line":"        proof.t1[i] = r[i] + c_power*x[i];","class":"linePartCov","hits":"1","order":"1305","possible_hits":"2",},
{"lineNum":"   76","line":"        proof.t2 += s[i] + c_power*y[i];","class":"linePartCov","hits":"1","order":"1312","possible_hits":"2",},
{"lineNum":"   77","line":"        proof.t3 += c_power*z[i];","class":"linePartCov","hits":"1","order":"1317","possible_hits":"2",},
{"lineNum":"   78","line":"        c_power *= c;","class":"lineCov","hits":"1","order":"1318","possible_hits":"1",},
{"lineNum":"   79","line":"    }","class":"lineCov","hits":"1","order":"1323","possible_hits":"1",},
{"lineNum":"   80","line":"}","class":"linePartCov","hits":"1","order":"1324","possible_hits":"11",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"bool Chaum::verify("},
{"lineNum":"   83","line":"    const Scalar& mu,"},
{"lineNum":"   84","line":"    const std::vector<GroupElement>& S,"},
{"lineNum":"   85","line":"    const std::vector<GroupElement>& T,"},
{"lineNum":"   86","line":"    ChaumProof& proof"},
{"lineNum":"   87","line":") {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   88","line":"    // Check proof semantics"},
{"lineNum":"   89","line":"    std::size_t n = S.size();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"    if (!(T.size() == n && proof.A2.size() == n && proof.t1.size() == n)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":"        throw std::invalid_argument(\"Bad Chaum semantics!\");","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   92","line":"    }"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    Scalar c = challenge(mu, S, T, proof.A1, proof.A2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    std::vector<Scalar> c_powers;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"    c_powers.emplace_back(c);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"    for (std::size_t i = 1; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   98","line":"        c_powers.emplace_back(c_powers[i-1]*c);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    // Weight the verification equations"},
{"lineNum":"  102","line":"    Scalar w;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":"    while (w.isZero()) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  104","line":"        w.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    }"},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    std::vector<Scalar> scalars;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":"    std::vector<GroupElement> points;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"    scalars.reserve(3*n + 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"    points.reserve(3*n + 5);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"    // F"},
{"lineNum":"  113","line":"    Scalar F_scalar;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  115","line":"        F_scalar -= proof.t1[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"    scalars.emplace_back(F_scalar);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"    points.emplace_back(F);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    // G"},
{"lineNum":"  121","line":"    scalars.emplace_back(proof.t2.negate() - w*proof.t2);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  122","line":"    points.emplace_back(G);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"    // H"},
{"lineNum":"  125","line":"    scalars.emplace_back(proof.t3.negate());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  126","line":"    points.emplace_back(H);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"    // U"},
{"lineNum":"  129","line":"    Scalar U_scalar;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  130","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  131","line":"        U_scalar += c_powers[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  132","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":"    U_scalar *= w;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"    scalars.emplace_back(U_scalar);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    points.emplace_back(U);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"    // A1"},
{"lineNum":"  138","line":"    scalars.emplace_back(Scalar((uint64_t) 1));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  139","line":"    points.emplace_back(proof.A1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"    // {A2}"},
{"lineNum":"  142","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  143","line":"        scalars.emplace_back(w);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"        points.emplace_back(proof.A2[i]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"    // {S}"},
{"lineNum":"  148","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  149","line":"        scalars.emplace_back(c_powers[i]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"        points.emplace_back(S[i]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"    // {T}"},
{"lineNum":"  154","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  155","line":"        scalars.emplace_back(w.negate()*proof.t1[i]);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  156","line":"        points.emplace_back(T[i]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":""},
{"lineNum":"  159","line":"    secp_primitives::MultiExponent multiexp(points, scalars);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":"    // merged equalities and doing check in one multiexponentation,"},
{"lineNum":"  161","line":"    // for weighting we use random w"},
{"lineNum":"  162","line":"    return multiexp.get_multiple().isInfinity();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  163","line":"}","class":"lineNoCov","hits":"0","possible_hits":"11",},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "chaum_fuzz_debug", "date" : "2023-08-09 12:13:21", "instrumented" : 99, "covered" : 48,};
var merged_data = [];
