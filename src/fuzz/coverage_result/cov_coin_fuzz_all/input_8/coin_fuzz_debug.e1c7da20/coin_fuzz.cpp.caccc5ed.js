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
{"lineNum":"   17","line":"    Scalar temp = fsp.GetScalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"    std::vector<unsigned char> result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   20","line":"    result.resize(SCALAR_ENCODING);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   21","line":"    temp.serialize(result.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"    const spark::Params* params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"    params = spark::Params::get_default();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"    const uint64_t i = len;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    // it will be better to choose s different way to generate the value"},
{"lineNum":"   29","line":"    const uint64_t v = std::rand();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"    const std::string memo = fdp.ConsumeBytesAsString(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    // Generate keys"},
{"lineNum":"   33","line":"    spark::SpendKey spend_key(params);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"    spark::FullViewKey full_view_key(spend_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   35","line":"    spark::IncomingViewKey incoming_view_key(full_view_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    // Generate address"},
{"lineNum":"   38","line":"    spark::Address address(incoming_view_key, i);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    // Generate coin"},
{"lineNum":"   41","line":"    Scalar k = fsp.GetScalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    spark::Coin coin = spark::Coin (","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"        params,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"        COIN_TYPE_MINT,"},
{"lineNum":"   46","line":"        k,"},
{"lineNum":"   47","line":"        address,"},
{"lineNum":"   48","line":"        v,"},
{"lineNum":"   49","line":"        memo,"},
{"lineNum":"   50","line":"        result"},
{"lineNum":"   51","line":"    );"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    // Identify coin"},
{"lineNum":"   54","line":"    spark::IdentifiedCoinData i_data = coin.identify(incoming_view_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"    assert(i_data.i == i);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"    assert(i_data.d == address.get_d());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"    assert(i_data.v == v);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"    assert(i_data.memo == memo);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    // Recover coin"},
{"lineNum":"   61","line":"    spark::RecoveredCoinData r_data = coin.recover(full_view_key, i_data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"    assert(params->get_F()*(spark::SparkUtils::hash_ser(k, coin.serial_context) + spark::SparkUtils::hash_Q2(incoming_view_key.get_s1(), i) + full_view_key.get_s2()) + full_view_key.get_D() == params->get_F()*r_data.s + full_view_key.get_D());","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    assert(r_data.T * r_data.s + full_view_key.get_D() == params->get_U());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"}","class":"lineNoCov","hits":"0","possible_hits":"5",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_fuzz_debug", "date" : "2023-08-02 12:13:04", "instrumented" : 28, "covered" : 0,};
var merged_data = [];
