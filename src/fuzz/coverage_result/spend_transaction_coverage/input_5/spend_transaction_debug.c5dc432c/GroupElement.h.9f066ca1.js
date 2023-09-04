var data = {lines:[
{"lineNum":"    1","line":"#ifndef SECP_GROUP_ELEMENT_H__"},
{"lineNum":"    2","line":"#define SECP_GROUP_ELEMENT_H__"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include \"Scalar.h\""},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#include <cstddef>"},
{"lineNum":"    7","line":"#include <ostream>"},
{"lineNum":"    8","line":"#include <string>"},
{"lineNum":"    9","line":"#include <vector>"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"#include <stddef.h>"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"namespace secp_primitives {"},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"class GroupElement final {"},
{"lineNum":"   17","line":"public:"},
{"lineNum":"   18","line":"    static constexpr std::size_t serialize_size = 34;"},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"public:"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"  GroupElement();"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"  ~GroupElement();"},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"  GroupElement(const GroupElement& other);"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"  GroupElement(const char* x,const char* y,  int base = 10);"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"  GroupElement& set(const GroupElement& other);"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"  GroupElement& operator=(const GroupElement& other);"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"  // Operator for multiplying with a scalar number."},
{"lineNum":"   35","line":"  GroupElement operator*(const Scalar& multiplier) const;"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"  // Operator for multiplying with a scalar number."},
{"lineNum":"   38","line":"  GroupElement& operator*=(const Scalar& multiplier);"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"  // Operator for adding to another element."},
{"lineNum":"   41","line":"  GroupElement operator+(const GroupElement& other) const;"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"  // Operator for adding to another element."},
{"lineNum":"   44","line":"  GroupElement& operator+=(const GroupElement& other);"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"  GroupElement inverse() const;"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"  void square();"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"  bool isMember() const;"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"  bool isInfinity() const;"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"  bool operator==(const GroupElement&other) const;"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"  bool operator!=(const GroupElement&other) const;"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"  GroupElement& generate(unsigned char* seed);"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"  void normalSha256(unsigned char* result) const;"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"  void sha256(unsigned char* result) const;"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"  void randomize();"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"  std::string tostring() const;"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"  std::string GetHex() const;"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"  friend std::ostream& operator<< ( std::ostream& os, const GroupElement& s ) {"},
{"lineNum":"   73","line":"        os << s.tostring() ;"},
{"lineNum":"   74","line":"        return os;"},
{"lineNum":"   75","line":"  }"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"  static constexpr size_t memoryRequired() { return serialize_size; }","class":"lineCov","hits":"2","order":"434","possible_hits":"2",},
{"lineNum":"   78","line":"  unsigned char* serialize() const;"},
{"lineNum":"   79","line":"  unsigned char* serialize(unsigned char* buffer) const;"},
{"lineNum":"   80","line":"  // The function deserializes the GroupElement and checks the validity,"},
{"lineNum":"   81","line":"  // it accepts infinity point, handle it based on your use case"},
{"lineNum":"   82","line":"  unsigned const char* deserialize(unsigned const char* buffer);"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"  // These functions are for READWRITE() in serialize.h"},
{"lineNum":"   85","line":"  template<typename Stream>"},
{"lineNum":"   86","line":"  inline void Serialize(Stream& s) const {","class":"lineCov","hits":"2","order":"1523","possible_hits":"2",},
{"lineNum":"   87","line":"        constexpr int size = memoryRequired();","class":"lineCov","hits":"1","order":"1524","possible_hits":"1",},
{"lineNum":"   88","line":"        unsigned char buffer[size];"},
{"lineNum":"   89","line":"        serialize(buffer);","class":"lineCov","hits":"1","order":"1525","possible_hits":"1",},
{"lineNum":"   90","line":"        char* b = (char*)buffer;","class":"lineCov","hits":"1","order":"1567","possible_hits":"1",},
{"lineNum":"   91","line":"        s.write(b, size);","class":"lineCov","hits":"1","order":"1568","possible_hits":"1",},
{"lineNum":"   92","line":"  }","class":"linePartCov","hits":"1","order":"1569","possible_hits":"2",},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"  template<typename Stream>"},
{"lineNum":"   95","line":"  inline void Unserialize(Stream& s) {"},
{"lineNum":"   96","line":"        constexpr int size = memoryRequired();"},
{"lineNum":"   97","line":"        unsigned char buffer[size];"},
{"lineNum":"   98","line":"        char* b = (char*)buffer;"},
{"lineNum":"   99","line":"        s.read(b, size);"},
{"lineNum":"  100","line":"        deserialize(buffer);"},
{"lineNum":"  101","line":"  }"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"  //function name like in CBignum"},
{"lineNum":"  104","line":"  std::vector<unsigned char> getvch() const;"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"  std::size_t hash() const;"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"  std::size_t get_hash() const;"},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"  GroupElement& set_base_g();"},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"  friend class MultiExponent;"},
{"lineNum":"  113","line":"private:"},
{"lineNum":"  114","line":"    // Returns the secp object inside it."},
{"lineNum":"  115","line":"    const void * get_value() const;"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    GroupElement(const void *g);"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"private:"},
{"lineNum":"  120","line":"    void *g_; // secp256k1_gej"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"};"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"} // namespace secp_primitives"},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"namespace std {"},
{"lineNum":"  127","line":"    template<>"},
{"lineNum":"  128","line":"    struct hash<secp_primitives::GroupElement>"},
{"lineNum":"  129","line":"    {"},
{"lineNum":"  130","line":"        size_t operator()(const secp_primitives::GroupElement& g) const"},
{"lineNum":"  131","line":"        {"},
{"lineNum":"  132","line":"            return g.get_hash();"},
{"lineNum":"  133","line":"        }"},
{"lineNum":"  134","line":"    };"},
{"lineNum":"  135","line":"} // namespace std"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"#endif // SECP_GROUP_ELEMENT_H__"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "spend_transaction_debug", "date" : "2023-08-30 10:00:56", "instrumented" : 7, "covered" : 7,};
var merged_data = [];
