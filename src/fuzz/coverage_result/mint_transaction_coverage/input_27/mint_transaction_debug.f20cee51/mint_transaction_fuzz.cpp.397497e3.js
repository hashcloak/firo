var data = {lines:[
{"lineNum":"    1","line":"#include \"../fuzzing_utilities.h\""},
{"lineNum":"    2","line":"#include \"../FuzzedDataProvider.h\""},
{"lineNum":"    3","line":"#include \"../../libspark/mint_transaction.h\""},
{"lineNum":"    4","line":"#include <cassert>"},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    7","line":"    FuzzedDataProvider fdp(buf, len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    8","line":"    FuzzedSecp256k1Object fsp(&fdp);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"    const spark::Params* params;"},
{"lineNum":"   11","line":"    params = spark::Params::get_default();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   12","line":"    const size_t t = fdp.ConsumeIntegral<uint8_t>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"    spark::SpendKey spend_key(params);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   15","line":"    spark::FullViewKey full_view_key(spend_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   16","line":"    spark::IncomingViewKey incoming_view_key(full_view_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"    std::vector<spark::MintedCoinData> outputs;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"    for (size_t i = 0; i < t; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   21","line":"        spark::MintedCoinData output;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":"        output.address = spark::Address(incoming_view_key, fdp.ConsumeIntegral<uint64_t>());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   23","line":"        output.v = fdp.ConsumeIntegral<int>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"        output.memo = fdp.ConsumeBytesAsString(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"        outputs.emplace_back(output);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    spark::MintTransaction mint(params, outputs, fdp.ConsumeBytes<unsigned char>(spark::SCALAR_ENCODING));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   29","line":"    assert(mint.verify());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    return 0;"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:42:47", "instrumented" : 19, "covered" : 0,};
var merged_data = [];
