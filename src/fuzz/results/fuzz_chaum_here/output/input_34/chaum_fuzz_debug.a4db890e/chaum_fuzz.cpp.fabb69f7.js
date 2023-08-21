var data = {lines:[
{"lineNum":"    1","line":"#include \"../fuzzing_utilities.h\""},
{"lineNum":"    2","line":"#include \"../FuzzedDataProvider.h\""},
{"lineNum":"    3","line":"#include \"../../libspark/chaum_proof.h\""},
{"lineNum":"    4","line":"#include \"../../libspark/chaum.h\""},
{"lineNum":"    5","line":"#include <cassert>"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineCov","hits":"2","order":"26","possible_hits":"2",},
{"lineNum":"    8","line":"    FuzzedDataProvider fdp(buf, len);","class":"lineCov","hits":"1","order":"27","possible_hits":"1",},
{"lineNum":"    9","line":"    FuzzedSecp256k1Object fsp(&fdp);","class":"lineCov","hits":"1","order":"29","possible_hits":"1",},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"    /** Serialization tests **/"},
{"lineNum":"   12","line":"    GroupElement F0, G0, H0, U0;","class":"lineCov","hits":"1","order":"33","possible_hits":"1",},
{"lineNum":"   13","line":"    F0.randomize();","class":"lineCov","hits":"1","order":"50","possible_hits":"1",},
{"lineNum":"   14","line":"    G0.randomize();","class":"lineCov","hits":"1","order":"587","possible_hits":"1",},
{"lineNum":"   15","line":"    H0.randomize();","class":"lineCov","hits":"1","order":"588","possible_hits":"1",},
{"lineNum":"   16","line":"    U0.randomize();","class":"lineCov","hits":"1","order":"589","possible_hits":"1",},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"    const std::size_t n = fdp.ConsumeIntegral<size_t>();","class":"lineCov","hits":"1","order":"590","possible_hits":"1",},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"    Scalar mu0;","class":"lineCov","hits":"1","order":"606","possible_hits":"1",},
{"lineNum":"   21","line":"    mu0.randomize();","class":"lineCov","hits":"1","order":"616","possible_hits":"1",},
{"lineNum":"   22","line":"    std::vector<Scalar> x0, y0, z0;","class":"lineCov","hits":"1","order":"700","possible_hits":"1",},
{"lineNum":"   23","line":"    x0.resize(n);","class":"lineCov","hits":"1","order":"701","possible_hits":"1",},
{"lineNum":"   24","line":"    y0.resize(n);","class":"lineCov","hits":"1","order":"702","possible_hits":"1",},
{"lineNum":"   25","line":"    z0.resize(n);","class":"lineCov","hits":"1","order":"703","possible_hits":"1",},
{"lineNum":"   26","line":"    std::vector<GroupElement> S0, T0;","class":"lineCov","hits":"1","order":"704","possible_hits":"1",},
{"lineNum":"   27","line":"    S0.resize(n);","class":"lineCov","hits":"1","order":"705","possible_hits":"1",},
{"lineNum":"   28","line":"    T0.resize(n);","class":"lineCov","hits":"1","order":"706","possible_hits":"1",},
{"lineNum":"   29","line":"    for (size_t i=0; i < n; i++) {","class":"lineCov","hits":"2","order":"707","possible_hits":"2",},
{"lineNum":"   30","line":"        x0[i].randomize();","class":"lineCov","hits":"1","order":"708","possible_hits":"1",},
{"lineNum":"   31","line":"        y0[i].randomize();","class":"lineCov","hits":"1","order":"709","possible_hits":"1",},
{"lineNum":"   32","line":"        z0[i].randomize();","class":"lineCov","hits":"1","order":"710","possible_hits":"1",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"        S0[i] = F0*x0[i] + G0*y0[i] + H0*z0[i];","class":"linePartCov","hits":"1","order":"711","possible_hits":"2",},
{"lineNum":"   35","line":"        T0[i] = (U0 + G0*y0[i].negate())*x0[i].inverse();","class":"linePartCov","hits":"1","order":"947","possible_hits":"2",},
{"lineNum":"   36","line":"    }"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    spark::ChaumProof proof0;","class":"lineCov","hits":"1","order":"1117","possible_hits":"1",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    spark::Chaum chaum0(F0, G0, H0, U0);","class":"lineCov","hits":"1","order":"1119","possible_hits":"1",},
{"lineNum":"   41","line":"    chaum0.prove(mu0, x0, y0, z0, S0, T0, proof0);","class":"lineCov","hits":"1","order":"1122","possible_hits":"1",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    CDataStream serialized(SER_NETWORK, PROTOCOL_VERSION);","class":"lineCov","hits":"1","order":"1325","possible_hits":"1",},
{"lineNum":"   44","line":"    serialized << proof0;","class":"lineCov","hits":"1","order":"1336","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    spark::ChaumProof deserialized_proof0;","class":"lineCov","hits":"1","order":"1395","possible_hits":"1",},
{"lineNum":"   47","line":"    serialized >> deserialized_proof0;","class":"lineCov","hits":"1","order":"1396","possible_hits":"1",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    assert(proof0.A1 == deserialized_proof0.A1);","class":"lineCov","hits":"1","order":"1488","possible_hits":"1",},
{"lineNum":"   50","line":"    assert(proof0.t2 == deserialized_proof0.t2);","class":"lineCov","hits":"1","order":"1489","possible_hits":"1",},
{"lineNum":"   51","line":"    assert(proof0.t3 == deserialized_proof0.t3);","class":"lineCov","hits":"1","order":"1490","possible_hits":"1",},
{"lineNum":"   52","line":"    for (size_t i = 0 ; i < n; i++) {","class":"lineCov","hits":"2","order":"1491","possible_hits":"2",},
{"lineNum":"   53","line":"        assert(proof0.A2[i] == deserialized_proof0.A2[i]);","class":"lineCov","hits":"1","order":"1492","possible_hits":"1",},
{"lineNum":"   54","line":"        assert(proof0.t1[i] == deserialized_proof0.t1[i]);","class":"lineCov","hits":"1","order":"1493","possible_hits":"1",},
{"lineNum":"   55","line":"    }","class":"lineCov","hits":"1","order":"1494","possible_hits":"1",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    /** Now fuzz all the things **/"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    GroupElement F1, G1, H1, U1;","class":"lineCov","hits":"1","order":"1495","possible_hits":"1",},
{"lineNum":"   60","line":"    //F1 = fsp.GetGroupElement();"},
{"lineNum":"   61","line":"    //G1 = fsp.GetGroupElement();"},
{"lineNum":"   62","line":"    //H1 = fsp.GetGroupElement();"},
{"lineNum":"   63","line":"    //U1 = fsp.GetGroupElement();"},
{"lineNum":"   64","line":"    F1.randomize();","class":"lineCov","hits":"1","order":"1496","possible_hits":"1",},
{"lineNum":"   65","line":"    G1.randomize();","class":"lineCov","hits":"1","order":"1497","possible_hits":"1",},
{"lineNum":"   66","line":"    H1.randomize();","class":"lineCov","hits":"1","order":"1498","possible_hits":"1",},
{"lineNum":"   67","line":"    U1.randomize();","class":"lineCov","hits":"1","order":"1499","possible_hits":"1",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    Scalar mu1;","class":"lineCov","hits":"1","order":"1500","possible_hits":"1",},
{"lineNum":"   70","line":"    mu1 = fsp.GetScalar();","class":"linePartCov","hits":"1","order":"1501","possible_hits":"2",},
{"lineNum":"   71","line":"    std::vector<Scalar> x1, y1, z1;","class":"lineCov","hits":"1","order":"1507","possible_hits":"1",},
{"lineNum":"   72","line":"    x1.resize(n);","class":"lineCov","hits":"1","order":"1508","possible_hits":"1",},
{"lineNum":"   73","line":"    x1 = fsp.GetScalars(n);","class":"lineCov","hits":"1","order":"1509","possible_hits":"1",},
{"lineNum":"   74","line":"    y1.resize(n);","class":"lineCov","hits":"1","order":"1517","possible_hits":"1",},
{"lineNum":"   75","line":"    y1 = fsp.GetScalars(n);","class":"lineCov","hits":"1","order":"1518","possible_hits":"1",},
{"lineNum":"   76","line":"    z1.resize(n);","class":"lineCov","hits":"1","order":"1519","possible_hits":"1",},
{"lineNum":"   77","line":"    z1 = fsp.GetScalars(n);","class":"lineCov","hits":"1","order":"1520","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    std::vector<GroupElement> S1, T1;","class":"lineCov","hits":"1","order":"1521","possible_hits":"1",},
{"lineNum":"   80","line":"    S1.resize(n);","class":"lineCov","hits":"1","order":"1522","possible_hits":"1",},
{"lineNum":"   81","line":"    T1.resize(n);","class":"lineCov","hits":"1","order":"1523","possible_hits":"1",},
{"lineNum":"   82","line":"    for (size_t i=0; i < n; i++) {","class":"lineCov","hits":"2","order":"1524","possible_hits":"2",},
{"lineNum":"   83","line":"        S1[i] = F1*x1[i] + G1*y1[i] + H1*z1[i];","class":"linePartCov","hits":"1","order":"1525","possible_hits":"2",},
{"lineNum":"   84","line":"        T1[i] = (U1 + G1*y1[i].negate())*x1[i].inverse();","class":"linePartCov","hits":"1","order":"1531","possible_hits":"2",},
{"lineNum":"   85","line":"    }"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"    spark::ChaumProof proof1;","class":"lineCov","hits":"1","order":"1535","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    spark::Chaum chaum1(F1, G1, H1, U1);","class":"lineCov","hits":"1","order":"1536","possible_hits":"1",},
{"lineNum":"   90","line":"    chaum1.prove(mu1, x1, y1, z1, S1, T1, proof1);","class":"lineCov","hits":"1","order":"1537","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    serialized << proof1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    spark::ChaumProof deserialized_proof1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    serialized >> deserialized_proof1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    assert(proof1.A1 == deserialized_proof1.A1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    assert(proof1.t2 == deserialized_proof1.t2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"    assert(proof1.t3 == deserialized_proof1.t3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"    for (size_t i = 0 ; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  101","line":"        assert(proof1.A2[i] == deserialized_proof1.A2[i]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":"        assert(proof1.t1[i] == deserialized_proof1.t1[i]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"    /**End of serialization tests**/"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    /** Completeness tests **/"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"    GroupElement F2, G2, H2, U2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"    F2.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"    G2.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"    H2.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"    U2.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    Scalar mu2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"    mu2.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"    std::vector<Scalar> x2, y2, z2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"    x2.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"    y2.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":"    z2.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":"    std::vector<GroupElement> S2, T2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"    S2.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":"    T2.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    for (size_t i=0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  124","line":"        x2[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"        y2[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":"        z2[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"        S2[i] = F2*x2[i] + G2*y2[i] + H2*z2[i];","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  129","line":"        T2[i] = (U2 + G2*y2[i].negate())*x2[i].inverse();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  130","line":"    }"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"    spark::ChaumProof proof2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"    spark::Chaum chaum2(F2, G2, H2, U2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    chaum2.prove(mu2, x2, y2, z2, S2, T2, proof2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"    assert(chaum2.verify(mu2, S2, T2, proof2));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    /** Full all the things again**/"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"    GroupElement F3, G3, H3, U3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":"    //F3 = fsp.GetGroupElement();"},
{"lineNum":"  142","line":"    //G3 = fsp.GetGroupElement();"},
{"lineNum":"  143","line":"    //H3 = fsp.GetGroupElement();"},
{"lineNum":"  144","line":"    //U3 = fsp.GetGroupElement();"},
{"lineNum":"  145","line":"    F3.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"    G3.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"    H3.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  148","line":"    U3.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  149","line":""},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"    Scalar mu3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":"    mu3 = fsp.GetScalar();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  153","line":"    std::vector<Scalar> x3, y3, z3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  154","line":"    x3.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  155","line":"    x3 = fsp.GetScalars(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":"    y3.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"    y3 = fsp.GetScalars(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"    z3.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  159","line":"    z3 = fsp.GetScalars(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    std::vector<GroupElement> S3, T3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"    S3.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  163","line":"    T3.resize(n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  164","line":"    for (size_t i=0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  165","line":"        S3[i] = F3*x3[i] + G3*y3[i] + H3*z3[i];","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  166","line":"        T3[i] = (U3 + G3*y3[i].negate())*x3[i].inverse();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  167","line":"    }"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"    spark::ChaumProof proof3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"    spark::Chaum chaum3(F3, G3, H3, U3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":"    chaum3.prove(mu3, x3, y3, z3, S3, T3, proof3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  173","line":"    assert(chaum3.verify(mu3, S3, T3, proof3));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"    /** End of completeness tests**/"},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"    /* Fuzzing for bad proofs*/"},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"    // Bad mu"},
{"lineNum":"  180","line":"    Scalar evil_mu;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    evil_mu.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":"    assert(!(chaum3.verify(evil_mu, S3, T3, proof3)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":""},
{"lineNum":"  184","line":"    // Bad S"},
{"lineNum":"  185","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  186","line":"        std::vector<GroupElement> evil_S(S3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  187","line":"        evil_S[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":"        assert(!(chaum3.verify(mu3, evil_S, T3, proof3)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"    // Bad T"},
{"lineNum":"  192","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  193","line":"        std::vector<GroupElement> evil_T(T3);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":"        evil_T[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  195","line":"        assert(!(chaum3.verify(mu3, S3, evil_T, proof3)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"    // Bad A1"},
{"lineNum":"  199","line":"    spark::ChaumProof evil_proof = proof3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  200","line":"    evil_proof.A1.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  201","line":"    assert(!(chaum3.verify(mu3, S3, T3, evil_proof)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"    // Bad A2"},
{"lineNum":"  204","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  205","line":"        evil_proof = proof3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  206","line":"        evil_proof.A2[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  207","line":"        assert(!(chaum3.verify(mu3, S3, T3, evil_proof)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  208","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"    // Bad t1"},
{"lineNum":"  211","line":"    for (std::size_t i = 0; i < n; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  212","line":"        evil_proof = proof3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"        evil_proof.t1[i].randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":"        assert(!(chaum3.verify(mu3, S3, T3, evil_proof)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  215","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  216","line":""},
{"lineNum":"  217","line":"    // Bad t2"},
{"lineNum":"  218","line":"    evil_proof = proof3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  219","line":"    evil_proof.t2.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":"    assert(!(chaum3.verify(mu3, S3, T3, evil_proof)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  221","line":""},
{"lineNum":"  222","line":"    // Bad t3"},
{"lineNum":"  223","line":"    evil_proof = proof3;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  224","line":"    evil_proof.t3.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  225","line":"    assert(!(chaum3.verify(mu3, S3, T3, evil_proof)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  226","line":""},
{"lineNum":"  227","line":"    return 0;"},
{"lineNum":"  228","line":""},
{"lineNum":"  229","line":"}","class":"lineNoCov","hits":"0","possible_hits":"19",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "chaum_fuzz_debug", "date" : "2023-08-09 12:35:58", "instrumented" : 152, "covered" : 61,};
var merged_data = [];
