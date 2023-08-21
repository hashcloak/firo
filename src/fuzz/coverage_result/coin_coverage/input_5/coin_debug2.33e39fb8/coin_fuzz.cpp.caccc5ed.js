var data = {lines:[
{"lineNum":"    1","line":"#include \"../fuzzing_utilities.h\""},
{"lineNum":"    2","line":"#include \"../FuzzedDataProvider.h\""},
{"lineNum":"    3","line":"#include \"../../libspark/coin.h\""},
{"lineNum":"    4","line":"// #include \"../../test/test_bitcoin.h\""},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#include <cassert>"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"const std::size_t SCALAR_ENCODING = 32;"},
{"lineNum":"    9","line":"const char COIN_TYPE_MINT = 0;"},
{"lineNum":"   10","line":"const char COIN_TYPE_SPEND = 1;"},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   14","line":"    FuzzedDataProvider fdp(buf, len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   15","line":"    FuzzedSecp256k1Object fsp(&fdp);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"    // Scalar temp = fsp.GetScalar();"},
{"lineNum":"   18","line":"    Scalar temp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   19","line":"    temp.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"    std::vector<unsigned char> result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":"    result.resize(SCALAR_ENCODING);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":"    temp.serialize(result.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"    const spark::Params* params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"    params = spark::Params::get_default();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    const uint64_t i = len;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    // it will be better to choose s different way to generate the value"},
{"lineNum":"   31","line":"    const uint64_t v = std::rand();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"    const std::string memo = fdp.ConsumeBytesAsString(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    // Generate keys"},
{"lineNum":"   35","line":"    spark::SpendKey spend_key(params);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"    spark::FullViewKey full_view_key(spend_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"    spark::IncomingViewKey incoming_view_key(full_view_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    // Generate address"},
{"lineNum":"   40","line":"    spark::Address address(incoming_view_key, i);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    // Generate coin"},
{"lineNum":"   43","line":"    // Scalar k = fsp.GetScalar();"},
{"lineNum":"   44","line":"    Scalar k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"    k.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    spark::Coin coin = spark::Coin (","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   48","line":"        params,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"        COIN_TYPE_MINT,"},
{"lineNum":"   50","line":"        k,"},
{"lineNum":"   51","line":"        address,"},
{"lineNum":"   52","line":"        v,"},
{"lineNum":"   53","line":"        memo,"},
{"lineNum":"   54","line":"        result"},
{"lineNum":"   55","line":"    );"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    // Identify coin"},
{"lineNum":"   58","line":"    spark::IdentifiedCoinData i_data = coin.identify(incoming_view_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"    assert(i_data.i == i);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    assert(i_data.d == address.get_d());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"    assert(i_data.v == v);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"    assert(i_data.memo == memo);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    // Recover coin"},
{"lineNum":"   65","line":"    spark::RecoveredCoinData r_data = coin.recover(full_view_key, i_data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"    assert(params->get_F()*(spark::SparkUtils::hash_ser(k, coin.serial_context) + spark::SparkUtils::hash_Q2(incoming_view_key.get_s1(), i) + full_view_key.get_s2()) + full_view_key.get_D() == params->get_F()*r_data.s + full_view_key.get_D());","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    assert(r_data.T * r_data.s + full_view_key.get_D() == params->get_U());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"}","class":"lineNoCov","hits":"0","possible_hits":"5",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug2", "date" : "2023-08-17 10:56:10", "instrumented" : 30, "covered" : 0,};
var merged_data = [];
