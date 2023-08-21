var data = {lines:[
{"lineNum":"    1","line":"#include \"../fuzzing_utilities.h\""},
{"lineNum":"    2","line":"#include \"../FuzzedDataProvider.h\""},
{"lineNum":"    3","line":"#include \"../../libspark/schnorr_proof.h\""},
{"lineNum":"    4","line":"#include \"../../libspark/schnorr.h\""},
{"lineNum":"    5","line":"#include <cassert>"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineCov","hits":"2","order":"26","possible_hits":"2",},
{"lineNum":"    8","line":"    FuzzedDataProvider fdp(buf, len);","class":"lineCov","hits":"1","order":"27","possible_hits":"1",},
{"lineNum":"    9","line":"    FuzzedSecp256k1Object fsp(&fdp);","class":"lineCov","hits":"1","order":"29","possible_hits":"1",},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"    /** Serialization and Completeness tests **/"},
{"lineNum":"   12","line":"    GroupElement G0;","class":"lineCov","hits":"1","order":"33","possible_hits":"1",},
{"lineNum":"   13","line":"    // G0 = fsp.GetGroupElement();"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"    // NOTE: all GetFroupElement() is replaced by GetMemberGroupElement()"},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"    // ensure that G0 is valid group element"},
{"lineNum":"   18","line":"    // thus the crash of valid fieldElement and groupElement will not occur"},
{"lineNum":"   19","line":"    G0.generate(buf);","class":"linePartCov","hits":"1","order":"50","possible_hits":"2",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"    Scalar y0;","class":"lineCov","hits":"1","order":"594","possible_hits":"1",},
{"lineNum":"   22","line":"    y0 = fsp.GetScalar();","class":"linePartCov","hits":"1","order":"604","possible_hits":"2",},
{"lineNum":"   23","line":"    GroupElement Y0 = G0*y0;","class":"lineCov","hits":"1","order":"676","possible_hits":"1",},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"    spark::SchnorrProof proof0;","class":"lineCov","hits":"1","order":"743","possible_hits":"1",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"    spark::Schnorr schnorr0(G0);","class":"lineCov","hits":"1","order":"745","possible_hits":"1",},
{"lineNum":"   28","line":"    schnorr0.prove(y0, Y0, proof0);","class":"lineCov","hits":"1","order":"748","possible_hits":"1",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    CDataStream serialized(SER_NETWORK, PROTOCOL_VERSION);","class":"lineCov","hits":"1","order":"1114","possible_hits":"1",},
{"lineNum":"   31","line":"    serialized << proof0;","class":"lineCov","hits":"1","order":"1125","possible_hits":"1",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"    spark::SchnorrProof deserialized_proof0;","class":"lineCov","hits":"1","order":"1165","possible_hits":"1",},
{"lineNum":"   34","line":"    serialized >> deserialized_proof0;","class":"lineCov","hits":"1","order":"1166","possible_hits":"1",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    assert(proof0.A == deserialized_proof0.A);","class":"lineCov","hits":"1","order":"1228","possible_hits":"1",},
{"lineNum":"   37","line":"    assert(proof0.t == deserialized_proof0.t);","class":"lineCov","hits":"1","order":"1235","possible_hits":"1",},
{"lineNum":"   38","line":"    assert(schnorr0.verify(Y0, proof0));","class":"lineCov","hits":"1","order":"1236","possible_hits":"1",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    /** End of serialization and completeness tests **/"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    /** Aggregation test **/"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    size_t n = fdp.ConsumeIntegral<size_t>();","class":"lineCov","hits":"1","order":"1433","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    GroupElement G1;","class":"lineCov","hits":"1","order":"1434","possible_hits":"1",},
{"lineNum":"   47","line":"    G1 = fsp.GetMemberGroupElement();","class":"linePartCov","hits":"1","order":"1435","possible_hits":"2",},
{"lineNum":"   48","line":"    std::vector<Scalar> y1;","class":"lineCov","hits":"1","order":"1436","possible_hits":"1",},
{"lineNum":"   49","line":"    std::vector<GroupElement> Y1;","class":"lineCov","hits":"1","order":"1437","possible_hits":"1",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    for(size_t i=0; i < n; i++) {","class":"linePartCov","hits":"1","order":"1438","possible_hits":"2",},
{"lineNum":"   52","line":"        y1.emplace_back();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"        y1.back() = fsp.GetScalar();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"        Y1.emplace_back(G1 * y1.back());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":"    }"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    spark::SchnorrProof proof1;","class":"lineCov","hits":"1","order":"1439","possible_hits":"1",},
{"lineNum":"   59","line":"    spark::Schnorr schnorr1(G1);","class":"lineCov","hits":"1","order":"1440","possible_hits":"1",},
{"lineNum":"   60","line":"    schnorr1.prove(y1, Y1, proof1);","class":"lineCov","hits":"1","order":"1441","possible_hits":"1",},
{"lineNum":"   61","line":"    assert(schnorr1.verify(Y1, proof1));","class":"lineCov","hits":"2","order":"1442","possible_hits":"2",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    /** End of aggregation test **/"},
{"lineNum":"   64","line":"}","class":"lineNoCov","hits":"0","possible_hits":"8",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "schnorr_hfuzz_debug", "date" : "2023-08-14 14:03:08", "instrumented" : 32, "covered" : 28,};
var merged_data = [];
