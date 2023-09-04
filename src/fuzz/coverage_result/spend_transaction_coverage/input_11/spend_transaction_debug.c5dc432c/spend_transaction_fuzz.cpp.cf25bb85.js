var data = {lines:[
{"lineNum":"    1","line":"#include \"../fuzzing_utilities.h\""},
{"lineNum":"    2","line":"#include \"../FuzzedDataProvider.h\""},
{"lineNum":"    3","line":"#include \"../../libspark/spend_transaction.h\""},
{"lineNum":"    4","line":"#include <cassert>"},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"extern \"C\" int LLVMFuzzerTestOneInput(uint8_t *buf, size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    7","line":"    FuzzedDataProvider fdp(buf, len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    8","line":"    FuzzedSecp256k1Object fsp(&fdp);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"    const spark::Params* params;"},
{"lineNum":"   11","line":"    params = spark::Params::get_default();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   12","line":"    const std::string memo = fdp.ConsumeBytesAsString(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"    spark::SpendKey spend_key(params);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   15","line":"    spark::FullViewKey full_view_key(spend_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   16","line":"    spark::IncomingViewKey incoming_view_key(full_view_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"    spark::Address address(incoming_view_key, fdp.ConsumeIntegral<uint64_t>());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"    size_t N = (size_t) pow(params->get_n_grootle(), params->get_m_grootle());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"    bool exception_thrown = false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":"    if (memo.size() > params->get_memo_bytes()) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"        try{"},
{"lineNum":"   25","line":"            Scalar k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"            k.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":"            uint64_t v = rand();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"            spark::Coin(params, spark::COIN_TYPE_MINT, k, address, v, memo, fdp.ConsumeBytes<unsigned char>(spark::SCALAR_ENCODING));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   29","line":"        } catch(const std::exception& ) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   30","line":"            exception_thrown = true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"        assert(exception_thrown);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"    }"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    std::vector<spark::Coin> in_coins;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"    for (size_t i = 0; i < N; i ++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   38","line":"        secp_primitives::Scalar k = fsp.GetScalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"        uint64_t v = fdp.ConsumeIntegral<uint64_t>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"        in_coins.emplace_back(spark::Coin(params, spark::COIN_TYPE_MINT, k, address, v, memo, fdp.ConsumeBytes<unsigned char>(spark::SCALAR_ENCODING)));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    uint64_t f = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    std::vector<uint8_t> spend_indices = fdp.ConsumeBytes<uint8_t>(len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"    std::vector<spark::InputCoinData> spend_coin_data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"    std::unordered_map<uint64_t, spark::CoverSetData> cover_set_data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    const size_t w = spend_indices.size();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"    for (size_t u = 0; u < w; u++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   52","line":"        spark::IdentifiedCoinData identified_coin_data = in_coins[spend_indices[u]].identify(incoming_view_key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"        spark::RecoveredCoinData recovered_coin_data = in_coins[spend_indices[u]].recover(full_view_key, identified_coin_data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"        spend_coin_data.emplace_back();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"        uint64_t cover_set_id = fdp.ConsumeIntegral<uint64_t>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"        spend_coin_data.back().cover_set_id = cover_set_id;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"        spark::CoverSetData set_data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"        set_data.cover_set = in_coins;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"        set_data.cover_set_representation = fdp.ConsumeBytes<unsigned char>(spark::SCALAR_ENCODING);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"        cover_set_data[cover_set_id] = set_data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"        spend_coin_data.back().index = spend_indices[u];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"        spend_coin_data.back().k = identified_coin_data.k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"        spend_coin_data.back().s = recovered_coin_data.s;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"        spend_coin_data.back().T = recovered_coin_data.T;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"        spend_coin_data.back().v = identified_coin_data.v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"        f += identified_coin_data.v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    const size_t t = fdp.ConsumeIntegral<uint8_t>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"    std::vector<spark::OutputCoinData> out_coin_data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"    for (size_t j = 0; j < t; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":"        out_coin_data.emplace_back();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"        out_coin_data.back().address = address;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"        out_coin_data.back().v = fdp.ConsumeIntegral<int>();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"        out_coin_data.back().memo = memo;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"        f -= out_coin_data.back().v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"    }"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    uint64_t fee_test = f;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"    for (size_t j = 0; j < t; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   85","line":"        fee_test += out_coin_data[j].v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"    }"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    for (size_t j = 0; j < t; j++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   89","line":"        fee_test -= spend_coin_data[j].v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"    }"},
{"lineNum":"   91","line":"    assert(fee_test == 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    spark::SpendTransaction transaction(params, full_view_key, spend_key, spend_coin_data, cover_set_data, f, 0, out_coin_data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    transaction.setCoverSets(cover_set_data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"    std::unordered_map<uint64_t, std::vector<spark::Coin>> cover_sets;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"    for (const auto set_data: cover_set_data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   98","line":"        cover_sets[set_data.first] = set_data.second.cover_set;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  100","line":"    assert(spark::SpendTransaction::verify(transaction, cover_sets));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"}","class":"lineNoCov","hits":"0","possible_hits":"6",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "spend_transaction_debug", "date" : "2023-08-30 10:01:04", "instrumented" : 72, "covered" : 0,};
var merged_data = [];
