var data = {lines:[
{"lineNum":"    1","line":"#include \"params.h\""},
{"lineNum":"    2","line":"#include \"../chainparams.h\""},
{"lineNum":"    3","line":"#include \"util.h\""},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"namespace spark {"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"    CCriticalSection Params::cs_instance;","class":"lineCov","hits":"2","order":"26","possible_hits":"2",},
{"lineNum":"    8","line":"    std::unique_ptr<Params> Params::instance;","class":"lineCov","hits":"2","order":"29","possible_hits":"2",},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"// Protocol parameters for deployment"},
{"lineNum":"   11","line":"Params const* Params::get_default() {","class":"lineCov","hits":"2","order":"150","possible_hits":"2",},
{"lineNum":"   12","line":"    if (instance) {","class":"lineCov","hits":"1","order":"151","possible_hits":"1",},
{"lineNum":"   13","line":"        return instance.get();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   14","line":"    } else {"},
{"lineNum":"   15","line":"        LOCK(cs_instance);","class":"lineCov","hits":"1","order":"152","possible_hits":"1",},
{"lineNum":"   16","line":"        if (instance) {","class":"lineCov","hits":"1","order":"166","possible_hits":"1",},
{"lineNum":"   17","line":"            return instance.get();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   18","line":"        }"},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"        std::size_t memo_bytes = 32;","class":"lineCov","hits":"1","order":"167","possible_hits":"1",},
{"lineNum":"   21","line":"        std::size_t max_M_range = 16;","class":"lineCov","hits":"1","order":"168","possible_hits":"1",},
{"lineNum":"   22","line":"        std::size_t n_grootle = 16;","class":"lineCov","hits":"1","order":"169","possible_hits":"1",},
{"lineNum":"   23","line":"        std::size_t m_grootle = 4;","class":"lineCov","hits":"1","order":"170","possible_hits":"1",},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"        instance.reset(new Params(memo_bytes, max_M_range, n_grootle, m_grootle));","class":"linePartCov","hits":"1","order":"171","possible_hits":"2",},
{"lineNum":"   26","line":"        return instance.get();","class":"lineCov","hits":"1","order":"544","possible_hits":"1",},
{"lineNum":"   27","line":"    }","class":"linePartCov","hits":"1","order":"545","possible_hits":"3",},
{"lineNum":"   28","line":"}","class":"linePartCov","hits":"1","order":"553","possible_hits":"2",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"// Protocol parameters for testing"},
{"lineNum":"   31","line":"Params const* Params::get_test() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":"    if (instance) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"        return instance.get();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"    } else {"},
{"lineNum":"   35","line":"        LOCK(cs_instance);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"        if (instance) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"            return instance.get();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"        }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"        std::size_t memo_bytes = 32;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"        std::size_t max_M_range = 16;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"        std::size_t n_grootle = 2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"        std::size_t m_grootle = 4;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"        instance.reset(new Params(memo_bytes, max_M_range, n_grootle, m_grootle));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   46","line":"        return instance.get();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   48","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"Params::Params(","class":"lineCov","hits":"1","order":"173","possible_hits":"1",},
{"lineNum":"   51","line":"    const std::size_t memo_bytes,"},
{"lineNum":"   52","line":"    const std::size_t max_M_range,"},
{"lineNum":"   53","line":"    const std::size_t n_grootle,"},
{"lineNum":"   54","line":"    const std::size_t m_grootle"},
{"lineNum":"   55","line":")"},
{"lineNum":"   56","line":"{","class":"lineCov","hits":"2","order":"172","possible_hits":"2",},
{"lineNum":"   57","line":"    // Global generators"},
{"lineNum":"   58","line":"    this->F = SparkUtils::hash_generator(LABEL_GENERATOR_F);","class":"linePartCov","hits":"1","order":"190","possible_hits":"2",},
{"lineNum":"   59","line":"    this->G.set_base_g();","class":"lineCov","hits":"1","order":"522","possible_hits":"1",},
{"lineNum":"   60","line":"    this->H = SparkUtils::hash_generator(LABEL_GENERATOR_H);","class":"linePartCov","hits":"1","order":"526","possible_hits":"2",},
{"lineNum":"   61","line":"    this->U = SparkUtils::hash_generator(LABEL_GENERATOR_U);","class":"linePartCov","hits":"1","order":"527","possible_hits":"2",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    // Coin parameters"},
{"lineNum":"   64","line":"    this->memo_bytes = memo_bytes;","class":"lineCov","hits":"1","order":"528","possible_hits":"1",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    // Range proof parameters"},
{"lineNum":"   67","line":"    this->max_M_range = max_M_range;","class":"lineCov","hits":"1","order":"529","possible_hits":"1",},
{"lineNum":"   68","line":"    this->G_range.resize(64*max_M_range);","class":"lineCov","hits":"1","order":"530","possible_hits":"1",},
{"lineNum":"   69","line":"    this->H_range.resize(64*max_M_range);","class":"lineCov","hits":"1","order":"531","possible_hits":"1",},
{"lineNum":"   70","line":"    for (std::size_t i = 0; i < 64*max_M_range; i++) {","class":"lineCov","hits":"2","order":"532","possible_hits":"2",},
{"lineNum":"   71","line":"        this->G_range[i] = SparkUtils::hash_generator(LABEL_GENERATOR_G_RANGE + \" \" + std::to_string(i));","class":"linePartCov","hits":"1","order":"533","possible_hits":"2",},
{"lineNum":"   72","line":"        this->H_range[i] = SparkUtils::hash_generator(LABEL_GENERATOR_H_RANGE + \" \" + std::to_string(i));","class":"linePartCov","hits":"1","order":"534","possible_hits":"2",},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    // One-of-many parameters"},
{"lineNum":"   76","line":"    if (n_grootle < 2 || m_grootle < 3) {","class":"lineCov","hits":"1","order":"535","possible_hits":"1",},
{"lineNum":"   77","line":"        throw std::invalid_argument(\"Bad Grootle parameteres\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   78","line":"    }"},
{"lineNum":"   79","line":"    this->n_grootle = n_grootle;","class":"lineCov","hits":"1","order":"536","possible_hits":"1",},
{"lineNum":"   80","line":"    this->m_grootle = m_grootle;","class":"lineCov","hits":"1","order":"537","possible_hits":"1",},
{"lineNum":"   81","line":"    this->G_grootle.resize(n_grootle * m_grootle);","class":"lineCov","hits":"1","order":"538","possible_hits":"1",},
{"lineNum":"   82","line":"    this->H_grootle.resize(n_grootle * m_grootle);","class":"lineCov","hits":"1","order":"539","possible_hits":"1",},
{"lineNum":"   83","line":"    for (std::size_t i = 0; i < n_grootle * m_grootle; i++) {","class":"lineCov","hits":"2","order":"540","possible_hits":"2",},
{"lineNum":"   84","line":"        this->G_grootle[i] = SparkUtils::hash_generator(LABEL_GENERATOR_G_GROOTLE + \" \" + std::to_string(i));","class":"linePartCov","hits":"1","order":"541","possible_hits":"2",},
{"lineNum":"   85","line":"        this->H_grootle[i] = SparkUtils::hash_generator(LABEL_GENERATOR_H_GROOTLE + \" \" + std::to_string(i));","class":"linePartCov","hits":"1","order":"542","possible_hits":"2",},
{"lineNum":"   86","line":"    }"},
{"lineNum":"   87","line":"}","class":"linePartCov","hits":"1","order":"543","possible_hits":"9",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"const GroupElement& Params::get_F() const {","class":"lineCov","hits":"2","order":"809","possible_hits":"2",},
{"lineNum":"   90","line":"    return this->F;","class":"lineCov","hits":"2","order":"593","possible_hits":"2",},
{"lineNum":"   91","line":"}"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"const GroupElement& Params::get_G() const {","class":"lineCov","hits":"2","order":"594","possible_hits":"2",},
{"lineNum":"   94","line":"    return this->G;","class":"lineCov","hits":"1","order":"595","possible_hits":"1",},
{"lineNum":"   95","line":"}"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"const GroupElement& Params::get_H() const {","class":"lineCov","hits":"2","order":"1380","possible_hits":"2",},
{"lineNum":"   98","line":"    return this->H;","class":"lineCov","hits":"1","order":"1381","possible_hits":"1",},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"const GroupElement& Params::get_U() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  102","line":"    return this->U;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":"}"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"const std::size_t Params::get_memo_bytes() const {","class":"lineCov","hits":"2","order":"1390","possible_hits":"2",},
{"lineNum":"  106","line":"    return this->memo_bytes;","class":"lineCov","hits":"1","order":"1391","possible_hits":"1",},
{"lineNum":"  107","line":"}"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"const std::vector<GroupElement>& Params::get_G_range() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  110","line":"    return this->G_range;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"}"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"const std::vector<GroupElement>& Params::get_H_range() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  114","line":"    return this->H_range;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"}"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"const std::vector<GroupElement>& Params::get_G_grootle() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  118","line":"    return this->G_grootle;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":"}"},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"const std::vector<GroupElement>& Params::get_H_grootle() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  122","line":"    return this->H_grootle;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"}"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"std::size_t Params::get_max_M_range() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  126","line":"    return this->max_M_range;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"}"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"std::size_t Params::get_n_grootle() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  130","line":"    return this->n_grootle;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"}"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"std::size_t Params::get_m_grootle() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  134","line":"    return this->m_grootle;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"}"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug", "date" : "2023-08-28 08:52:46", "instrumented" : 77, "covered" : 44,};
var merged_data = [];
