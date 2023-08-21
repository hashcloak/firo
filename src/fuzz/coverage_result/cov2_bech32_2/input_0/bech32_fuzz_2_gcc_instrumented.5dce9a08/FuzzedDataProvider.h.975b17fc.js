var data = {lines:[
{"lineNum":"    1","line":"//===- FuzzedDataProvider.h - Utility header for fuzz targets ---*- C++ -* ===//"},
{"lineNum":"    2","line":"//"},
{"lineNum":"    3","line":"// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions."},
{"lineNum":"    4","line":"// See https://llvm.org/LICENSE.txt for license information."},
{"lineNum":"    5","line":"// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception"},
{"lineNum":"    6","line":"//"},
{"lineNum":"    7","line":"//===----------------------------------------------------------------------===//"},
{"lineNum":"    8","line":"// A single header library providing an utility class to break up an array of"},
{"lineNum":"    9","line":"// bytes. Whenever run on the same input, provides the same output, as long as"},
{"lineNum":"   10","line":"// its methods are called in the same order, with the same arguments."},
{"lineNum":"   11","line":"//===----------------------------------------------------------------------===//"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"#ifndef LLVM_FUZZER_FUZZED_DATA_PROVIDER_H_"},
{"lineNum":"   14","line":"#define LLVM_FUZZER_FUZZED_DATA_PROVIDER_H_"},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"#include <algorithm>"},
{"lineNum":"   17","line":"#include <array>"},
{"lineNum":"   18","line":"#include <climits>"},
{"lineNum":"   19","line":"#include <cstddef>"},
{"lineNum":"   20","line":"#include <cstdint>"},
{"lineNum":"   21","line":"#include <cstring>"},
{"lineNum":"   22","line":"#include <initializer_list>"},
{"lineNum":"   23","line":"#include <limits>"},
{"lineNum":"   24","line":"#include <string>"},
{"lineNum":"   25","line":"#include <type_traits>"},
{"lineNum":"   26","line":"#include <utility>"},
{"lineNum":"   27","line":"#include <vector>"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"// In addition to the comments below, the API is also briefly documented at"},
{"lineNum":"   30","line":"// https://github.com/google/fuzzing/blob/master/docs/split-inputs.md#fuzzed-data-provider"},
{"lineNum":"   31","line":"class FuzzedDataProvider {"},
{"lineNum":"   32","line":" public:"},
{"lineNum":"   33","line":"  // |data| is an array of length |size| that the FuzzedDataProvider wraps to"},
{"lineNum":"   34","line":"  // provide more granular access. |data| must outlive the FuzzedDataProvider."},
{"lineNum":"   35","line":"  FuzzedDataProvider(const uint8_t *data, size_t size)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"      : data_ptr_(data), remaining_bytes_(size) {}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   37","line":"  ~FuzzedDataProvider() = default;"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"  // See the implementation below (after the class definition) for more verbose"},
{"lineNum":"   40","line":"  // comments for each of the methods."},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"  // Methods returning std::vector of bytes. These are the most popular choice"},
{"lineNum":"   43","line":"  // when splitting fuzzing input into pieces, as every piece is put into a"},
{"lineNum":"   44","line":"  // separate buffer (i.e. ASan would catch any under-/overflow) and the memory"},
{"lineNum":"   45","line":"  // will be released automatically."},
{"lineNum":"   46","line":"  template <typename T> std::vector<T> ConsumeBytes(size_t num_bytes);"},
{"lineNum":"   47","line":"  template <typename T>"},
{"lineNum":"   48","line":"  std::vector<T> ConsumeBytesWithTerminator(size_t num_bytes, T terminator = 0);"},
{"lineNum":"   49","line":"  template <typename T> std::vector<T> ConsumeRemainingBytes();"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"  // Methods returning strings. Use only when you need a std::string or a null"},
{"lineNum":"   52","line":"  // terminated C-string. Otherwise, prefer the methods returning std::vector."},
{"lineNum":"   53","line":"  std::string ConsumeBytesAsString(size_t num_bytes);"},
{"lineNum":"   54","line":"  std::string ConsumeRandomLengthString(size_t max_length);"},
{"lineNum":"   55","line":"  std::string ConsumeRandomLengthString();"},
{"lineNum":"   56","line":"  std::string ConsumeRemainingBytesAsString();"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"  // Methods returning integer values."},
{"lineNum":"   59","line":"  template <typename T> T ConsumeIntegral();"},
{"lineNum":"   60","line":"  template <typename T> T ConsumeIntegralInRange(T min, T max);"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"  // Methods returning floating point values."},
{"lineNum":"   63","line":"  template <typename T> T ConsumeFloatingPoint();"},
{"lineNum":"   64","line":"  template <typename T> T ConsumeFloatingPointInRange(T min, T max);"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"  // 0 <= return value <= 1."},
{"lineNum":"   67","line":"  template <typename T> T ConsumeProbability();"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"  bool ConsumeBool();"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"  // Returns a value chosen from the given enum."},
{"lineNum":"   72","line":"  template <typename T> T ConsumeEnum();"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"  // Returns a value from the given array."},
{"lineNum":"   75","line":"  template <typename T, size_t size> T PickValueInArray(const T (&array)[size]);"},
{"lineNum":"   76","line":"  template <typename T, size_t size>"},
{"lineNum":"   77","line":"  T PickValueInArray(const std::array<T, size> &array);"},
{"lineNum":"   78","line":"  template <typename T> T PickValueInArray(std::initializer_list<const T> list);"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"  // Writes data to the given destination and returns number of bytes written."},
{"lineNum":"   81","line":"  size_t ConsumeData(void *destination, size_t num_bytes);"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"  // Reports the remaining bytes available for fuzzed input."},
{"lineNum":"   84","line":"  size_t remaining_bytes() { return remaining_bytes_; }"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":" private:"},
{"lineNum":"   87","line":"  FuzzedDataProvider(const FuzzedDataProvider &) = delete;"},
{"lineNum":"   88","line":"  FuzzedDataProvider &operator=(const FuzzedDataProvider &) = delete;"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"  void CopyAndAdvance(void *destination, size_t num_bytes);"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"  void Advance(size_t num_bytes);"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"  template <typename T>"},
{"lineNum":"   95","line":"  std::vector<T> ConsumeBytes(size_t size, size_t num_bytes);"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"  template <typename TS, typename TU> TS ConvertUnsignedToSigned(TU value);"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"  const uint8_t *data_ptr_;"},
{"lineNum":"  100","line":"  size_t remaining_bytes_;"},
{"lineNum":"  101","line":"};"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"// Returns a std::vector containing |num_bytes| of input data. If fewer than"},
{"lineNum":"  104","line":"// |num_bytes| of data remain, returns a shorter std::vector containing all"},
{"lineNum":"  105","line":"// of the data that\'s left. Can be used with any byte sized type, such as"},
{"lineNum":"  106","line":"// char, unsigned char, uint8_t, etc."},
{"lineNum":"  107","line":"template <typename T>"},
{"lineNum":"  108","line":"std::vector<T> FuzzedDataProvider::ConsumeBytes(size_t num_bytes) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  109","line":"  num_bytes = std::min(num_bytes, remaining_bytes_);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  110","line":"  return ConsumeBytes<T>(num_bytes, num_bytes);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"// Similar to |ConsumeBytes|, but also appends the terminator value at the end"},
{"lineNum":"  114","line":"// of the resulting vector. Useful, when a mutable null-terminated C-string is"},
{"lineNum":"  115","line":"// needed, for example. But that is a rare case. Better avoid it, if possible,"},
{"lineNum":"  116","line":"// and prefer using |ConsumeBytes| or |ConsumeBytesAsString| methods."},
{"lineNum":"  117","line":"template <typename T>"},
{"lineNum":"  118","line":"std::vector<T> FuzzedDataProvider::ConsumeBytesWithTerminator(size_t num_bytes,"},
{"lineNum":"  119","line":"                                                              T terminator) {"},
{"lineNum":"  120","line":"  num_bytes = std::min(num_bytes, remaining_bytes_);"},
{"lineNum":"  121","line":"  std::vector<T> result = ConsumeBytes<T>(num_bytes + 1, num_bytes);"},
{"lineNum":"  122","line":"  result.back() = terminator;"},
{"lineNum":"  123","line":"  return result;"},
{"lineNum":"  124","line":"}"},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"// Returns a std::vector containing all remaining bytes of the input data."},
{"lineNum":"  127","line":"template <typename T>"},
{"lineNum":"  128","line":"std::vector<T> FuzzedDataProvider::ConsumeRemainingBytes() {"},
{"lineNum":"  129","line":"  return ConsumeBytes<T>(remaining_bytes_);"},
{"lineNum":"  130","line":"}"},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"// Returns a std::string containing |num_bytes| of input data. Using this and"},
{"lineNum":"  133","line":"// |.c_str()| on the resulting string is the best way to get an immutable"},
{"lineNum":"  134","line":"// null-terminated C string. If fewer than |num_bytes| of data remain, returns"},
{"lineNum":"  135","line":"// a shorter std::string containing all of the data that\'s left."},
{"lineNum":"  136","line":"inline std::string FuzzedDataProvider::ConsumeBytesAsString(size_t num_bytes) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  137","line":"  static_assert(sizeof(std::string::value_type) == sizeof(uint8_t),"},
{"lineNum":"  138","line":"                \"ConsumeBytesAsString cannot convert the data to a string.\");"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"  num_bytes = std::min(num_bytes, remaining_bytes_);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  141","line":"  std::string result("},
{"lineNum":"  142","line":"      reinterpret_cast<const std::string::value_type *>(data_ptr_), num_bytes);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  143","line":"  Advance(num_bytes);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"  return result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"// Returns a std::string of length from 0 to |max_length|. When it runs out of"},
{"lineNum":"  148","line":"// input data, returns what remains of the input. Designed to be more stable"},
{"lineNum":"  149","line":"// with respect to a fuzzer inserting characters than just picking a random"},
{"lineNum":"  150","line":"// length and then consuming that many bytes with |ConsumeBytes|."},
{"lineNum":"  151","line":"inline std::string"},
{"lineNum":"  152","line":"FuzzedDataProvider::ConsumeRandomLengthString(size_t max_length) {"},
{"lineNum":"  153","line":"  // Reads bytes from the start of |data_ptr_|. Maps \"\\\\\" to \"\\\", and maps \"\\\""},
{"lineNum":"  154","line":"  // followed by anything else to the end of the string. As a result of this"},
{"lineNum":"  155","line":"  // logic, a fuzzer can insert characters into the string, and the string"},
{"lineNum":"  156","line":"  // will be lengthened to include those new characters, resulting in a more"},
{"lineNum":"  157","line":"  // stable fuzzer than picking the length of a string independently from"},
{"lineNum":"  158","line":"  // picking its contents."},
{"lineNum":"  159","line":"  std::string result;"},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"  // Reserve the anticipated capaticity to prevent several reallocations."},
{"lineNum":"  162","line":"  result.reserve(std::min(max_length, remaining_bytes_));"},
{"lineNum":"  163","line":"  for (size_t i = 0; i < max_length && remaining_bytes_ != 0; ++i) {"},
{"lineNum":"  164","line":"    char next = ConvertUnsignedToSigned<char>(data_ptr_[0]);"},
{"lineNum":"  165","line":"    Advance(1);"},
{"lineNum":"  166","line":"    if (next == \'\\\\\' && remaining_bytes_ != 0) {"},
{"lineNum":"  167","line":"      next = ConvertUnsignedToSigned<char>(data_ptr_[0]);"},
{"lineNum":"  168","line":"      Advance(1);"},
{"lineNum":"  169","line":"      if (next != \'\\\\\')"},
{"lineNum":"  170","line":"        break;"},
{"lineNum":"  171","line":"    }"},
{"lineNum":"  172","line":"    result += next;"},
{"lineNum":"  173","line":"  }"},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"  result.shrink_to_fit();"},
{"lineNum":"  176","line":"  return result;"},
{"lineNum":"  177","line":"}"},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"// Returns a std::string of length from 0 to |remaining_bytes_|."},
{"lineNum":"  180","line":"inline std::string FuzzedDataProvider::ConsumeRandomLengthString() {"},
{"lineNum":"  181","line":"  return ConsumeRandomLengthString(remaining_bytes_);"},
{"lineNum":"  182","line":"}"},
{"lineNum":"  183","line":""},
{"lineNum":"  184","line":"// Returns a std::string containing all remaining bytes of the input data."},
{"lineNum":"  185","line":"// Prefer using |ConsumeRemainingBytes| unless you actually need a std::string"},
{"lineNum":"  186","line":"// object."},
{"lineNum":"  187","line":"inline std::string FuzzedDataProvider::ConsumeRemainingBytesAsString() {"},
{"lineNum":"  188","line":"  return ConsumeBytesAsString(remaining_bytes_);"},
{"lineNum":"  189","line":"}"},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"// Returns a number in the range [Type\'s min, Type\'s max]. The value might"},
{"lineNum":"  192","line":"// not be uniformly distributed in the given range. If there\'s no input data"},
{"lineNum":"  193","line":"// left, always returns |min|."},
{"lineNum":"  194","line":"template <typename T> T FuzzedDataProvider::ConsumeIntegral() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  195","line":"  return ConsumeIntegralInRange(std::numeric_limits<T>::min(),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"                                std::numeric_limits<T>::max());","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  197","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"// Returns a number in the range [min, max] by consuming bytes from the"},
{"lineNum":"  200","line":"// input data. The value might not be uniformly distributed in the given"},
{"lineNum":"  201","line":"// range. If there\'s no input data left, always returns |min|. |min| must"},
{"lineNum":"  202","line":"// be less than or equal to |max|."},
{"lineNum":"  203","line":"template <typename T>"},
{"lineNum":"  204","line":"T FuzzedDataProvider::ConsumeIntegralInRange(T min, T max) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  205","line":"  static_assert(std::is_integral<T>::value, \"An integral type is required.\");"},
{"lineNum":"  206","line":"  static_assert(sizeof(T) <= sizeof(uint64_t), \"Unsupported integral type.\");"},
{"lineNum":"  207","line":""},
{"lineNum":"  208","line":"  if (min > max)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  209","line":"    abort();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  210","line":""},
{"lineNum":"  211","line":"  // Use the biggest type possible to hold the range and the result."},
{"lineNum":"  212","line":"  uint64_t range = static_cast<uint64_t>(max) - min;","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"  213","line":"  uint64_t result = 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  214","line":"  size_t offset = 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  215","line":""},
{"lineNum":"  216","line":"  while (offset < sizeof(T) * CHAR_BIT && (range >> offset) > 0 &&","class":"lineNoCov","hits":"0","possible_hits":"10",},
{"lineNum":"  217","line":"         remaining_bytes_ != 0) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  218","line":"    // Pull bytes off the end of the seed data. Experimentally, this seems to"},
{"lineNum":"  219","line":"    // allow the fuzzer to more easily explore the input space. This makes"},
{"lineNum":"  220","line":"    // sense, since it works by modifying inputs that caused new code to run,"},
{"lineNum":"  221","line":"    // and this data is often used to encode length of data read by"},
{"lineNum":"  222","line":"    // |ConsumeBytes|. Separating out read lengths makes it easier modify the"},
{"lineNum":"  223","line":"    // contents of the data that is actually read."},
{"lineNum":"  224","line":"    --remaining_bytes_;","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  225","line":"    result = (result << CHAR_BIT) | data_ptr_[remaining_bytes_];","class":"lineNoCov","hits":"0","possible_hits":"10",},
{"lineNum":"  226","line":"    offset += CHAR_BIT;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  227","line":"  }"},
{"lineNum":"  228","line":""},
{"lineNum":"  229","line":"  // Avoid division by 0, in case |range + 1| results in overflow."},
{"lineNum":"  230","line":"  if (range != std::numeric_limits<decltype(range)>::max())","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"  231","line":"    result = result % (range + 1);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  232","line":""},
{"lineNum":"  233","line":"  return static_cast<T>(min + result);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  234","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  235","line":""},
{"lineNum":"  236","line":"// Returns a floating point value in the range [Type\'s lowest, Type\'s max] by"},
{"lineNum":"  237","line":"// consuming bytes from the input data. If there\'s no input data left, always"},
{"lineNum":"  238","line":"// returns approximately 0."},
{"lineNum":"  239","line":"template <typename T> T FuzzedDataProvider::ConsumeFloatingPoint() {"},
{"lineNum":"  240","line":"  return ConsumeFloatingPointInRange<T>(std::numeric_limits<T>::lowest(),"},
{"lineNum":"  241","line":"                                        std::numeric_limits<T>::max());"},
{"lineNum":"  242","line":"}"},
{"lineNum":"  243","line":""},
{"lineNum":"  244","line":"// Returns a floating point value in the given range by consuming bytes from"},
{"lineNum":"  245","line":"// the input data. If there\'s no input data left, returns |min|. Note that"},
{"lineNum":"  246","line":"// |min| must be less than or equal to |max|."},
{"lineNum":"  247","line":"template <typename T>"},
{"lineNum":"  248","line":"T FuzzedDataProvider::ConsumeFloatingPointInRange(T min, T max) {"},
{"lineNum":"  249","line":"  if (min > max)"},
{"lineNum":"  250","line":"    abort();"},
{"lineNum":"  251","line":""},
{"lineNum":"  252","line":"  T range = .0;"},
{"lineNum":"  253","line":"  T result = min;"},
{"lineNum":"  254","line":"  constexpr T zero(.0);"},
{"lineNum":"  255","line":"  if (max > zero && min < zero && max > min + std::numeric_limits<T>::max()) {"},
{"lineNum":"  256","line":"    // The diff |max - min| would overflow the given floating point type. Use"},
{"lineNum":"  257","line":"    // the half of the diff as the range and consume a bool to decide whether"},
{"lineNum":"  258","line":"    // the result is in the first of the second part of the diff."},
{"lineNum":"  259","line":"    range = (max / 2.0) - (min / 2.0);"},
{"lineNum":"  260","line":"    if (ConsumeBool()) {"},
{"lineNum":"  261","line":"      result += range;"},
{"lineNum":"  262","line":"    }"},
{"lineNum":"  263","line":"  } else {"},
{"lineNum":"  264","line":"    range = max - min;"},
{"lineNum":"  265","line":"  }"},
{"lineNum":"  266","line":""},
{"lineNum":"  267","line":"  return result + range * ConsumeProbability<T>();"},
{"lineNum":"  268","line":"}"},
{"lineNum":"  269","line":""},
{"lineNum":"  270","line":"// Returns a floating point number in the range [0.0, 1.0]. If there\'s no"},
{"lineNum":"  271","line":"// input data left, always returns 0."},
{"lineNum":"  272","line":"template <typename T> T FuzzedDataProvider::ConsumeProbability() {"},
{"lineNum":"  273","line":"  static_assert(std::is_floating_point<T>::value,"},
{"lineNum":"  274","line":"                \"A floating point type is required.\");"},
{"lineNum":"  275","line":""},
{"lineNum":"  276","line":"  // Use different integral types for different floating point types in order"},
{"lineNum":"  277","line":"  // to provide better density of the resulting values."},
{"lineNum":"  278","line":"  using IntegralType ="},
{"lineNum":"  279","line":"      typename std::conditional<(sizeof(T) <= sizeof(uint32_t)), uint32_t,"},
{"lineNum":"  280","line":"                                uint64_t>::type;"},
{"lineNum":"  281","line":""},
{"lineNum":"  282","line":"  T result = static_cast<T>(ConsumeIntegral<IntegralType>());"},
{"lineNum":"  283","line":"  result /= static_cast<T>(std::numeric_limits<IntegralType>::max());"},
{"lineNum":"  284","line":"  return result;"},
{"lineNum":"  285","line":"}"},
{"lineNum":"  286","line":""},
{"lineNum":"  287","line":"// Reads one byte and returns a bool, or false when no data remains."},
{"lineNum":"  288","line":"inline bool FuzzedDataProvider::ConsumeBool() {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  289","line":"  return 1 & ConsumeIntegral<uint8_t>();","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  290","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  291","line":""},
{"lineNum":"  292","line":"// Returns an enum value. The enum must start at 0 and be contiguous. It must"},
{"lineNum":"  293","line":"// also contain |kMaxValue| aliased to its largest (inclusive) value. Such as:"},
{"lineNum":"  294","line":"// enum class Foo { SomeValue, OtherValue, kMaxValue = OtherValue };"},
{"lineNum":"  295","line":"template <typename T> T FuzzedDataProvider::ConsumeEnum() {"},
{"lineNum":"  296","line":"  static_assert(std::is_enum<T>::value, \"|T| must be an enum type.\");"},
{"lineNum":"  297","line":"  return static_cast<T>("},
{"lineNum":"  298","line":"      ConsumeIntegralInRange<uint32_t>(0, static_cast<uint32_t>(T::kMaxValue)));"},
{"lineNum":"  299","line":"}"},
{"lineNum":"  300","line":""},
{"lineNum":"  301","line":"// Returns a copy of the value selected from the given fixed-size |array|."},
{"lineNum":"  302","line":"template <typename T, size_t size>"},
{"lineNum":"  303","line":"T FuzzedDataProvider::PickValueInArray(const T (&array)[size]) {"},
{"lineNum":"  304","line":"  static_assert(size > 0, \"The array must be non empty.\");"},
{"lineNum":"  305","line":"  return array[ConsumeIntegralInRange<size_t>(0, size - 1)];"},
{"lineNum":"  306","line":"}"},
{"lineNum":"  307","line":""},
{"lineNum":"  308","line":"template <typename T, size_t size>"},
{"lineNum":"  309","line":"T FuzzedDataProvider::PickValueInArray(const std::array<T, size> &array) {"},
{"lineNum":"  310","line":"  static_assert(size > 0, \"The array must be non empty.\");"},
{"lineNum":"  311","line":"  return array[ConsumeIntegralInRange<size_t>(0, size - 1)];"},
{"lineNum":"  312","line":"}"},
{"lineNum":"  313","line":""},
{"lineNum":"  314","line":"template <typename T>"},
{"lineNum":"  315","line":"T FuzzedDataProvider::PickValueInArray(std::initializer_list<const T> list) {"},
{"lineNum":"  316","line":"  // TODO(Dor1s): switch to static_assert once C++14 is allowed."},
{"lineNum":"  317","line":"  if (!list.size())"},
{"lineNum":"  318","line":"    abort();"},
{"lineNum":"  319","line":""},
{"lineNum":"  320","line":"  return *(list.begin() + ConsumeIntegralInRange<size_t>(0, list.size() - 1));"},
{"lineNum":"  321","line":"}"},
{"lineNum":"  322","line":""},
{"lineNum":"  323","line":"// Writes |num_bytes| of input data to the given destination pointer. If there"},
{"lineNum":"  324","line":"// is not enough data left, writes all remaining bytes. Return value is the"},
{"lineNum":"  325","line":"// number of bytes written."},
{"lineNum":"  326","line":"// In general, it\'s better to avoid using this function, but it may be useful"},
{"lineNum":"  327","line":"// in cases when it\'s necessary to fill a certain buffer or object with"},
{"lineNum":"  328","line":"// fuzzing data."},
{"lineNum":"  329","line":"inline size_t FuzzedDataProvider::ConsumeData(void *destination,"},
{"lineNum":"  330","line":"                                              size_t num_bytes) {"},
{"lineNum":"  331","line":"  num_bytes = std::min(num_bytes, remaining_bytes_);"},
{"lineNum":"  332","line":"  CopyAndAdvance(destination, num_bytes);"},
{"lineNum":"  333","line":"  return num_bytes;"},
{"lineNum":"  334","line":"}"},
{"lineNum":"  335","line":""},
{"lineNum":"  336","line":"// Private methods."},
{"lineNum":"  337","line":"inline void FuzzedDataProvider::CopyAndAdvance(void *destination,"},
{"lineNum":"  338","line":"                                               size_t num_bytes) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  339","line":"  std::memcpy(destination, data_ptr_, num_bytes);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  340","line":"  Advance(num_bytes);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  341","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  342","line":""},
{"lineNum":"  343","line":"inline void FuzzedDataProvider::Advance(size_t num_bytes) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  344","line":"  if (num_bytes > remaining_bytes_)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  345","line":"    abort();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  346","line":""},
{"lineNum":"  347","line":"  data_ptr_ += num_bytes;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  348","line":"  remaining_bytes_ -= num_bytes;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  349","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  350","line":""},
{"lineNum":"  351","line":"template <typename T>"},
{"lineNum":"  352","line":"std::vector<T> FuzzedDataProvider::ConsumeBytes(size_t size, size_t num_bytes) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  353","line":"  static_assert(sizeof(T) == sizeof(uint8_t), \"Incompatible data type.\");"},
{"lineNum":"  354","line":""},
{"lineNum":"  355","line":"  // The point of using the size-based constructor below is to increase the"},
{"lineNum":"  356","line":"  // odds of having a vector object with capacity being equal to the length."},
{"lineNum":"  357","line":"  // That part is always implementation specific, but at least both libc++ and"},
{"lineNum":"  358","line":"  // libstdc++ allocate the requested number of bytes in that constructor,"},
{"lineNum":"  359","line":"  // which seems to be a natural choice for other implementations as well."},
{"lineNum":"  360","line":"  // To increase the odds even more, we also call |shrink_to_fit| below."},
{"lineNum":"  361","line":"  std::vector<T> result(size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  362","line":"  if (size == 0) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  363","line":"    if (num_bytes != 0)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  364","line":"      abort();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  365","line":"    return result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  366","line":"  }"},
{"lineNum":"  367","line":""},
{"lineNum":"  368","line":"  CopyAndAdvance(result.data(), num_bytes);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  369","line":""},
{"lineNum":"  370","line":"  // Even though |shrink_to_fit| is also implementation specific, we expect it"},
{"lineNum":"  371","line":"  // to provide an additional assurance in case vector\'s constructor allocated"},
{"lineNum":"  372","line":"  // a buffer which is larger than the actual amount of data we put inside it."},
{"lineNum":"  373","line":"  result.shrink_to_fit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  374","line":"  return result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  375","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  376","line":""},
{"lineNum":"  377","line":"template <typename TS, typename TU>"},
{"lineNum":"  378","line":"TS FuzzedDataProvider::ConvertUnsignedToSigned(TU value) {"},
{"lineNum":"  379","line":"  static_assert(sizeof(TS) == sizeof(TU), \"Incompatible data types.\");"},
{"lineNum":"  380","line":"  static_assert(!std::numeric_limits<TU>::is_signed,"},
{"lineNum":"  381","line":"                \"Source type must be unsigned.\");"},
{"lineNum":"  382","line":""},
{"lineNum":"  383","line":"  // TODO(Dor1s): change to `if constexpr` once C++17 becomes mainstream."},
{"lineNum":"  384","line":"  if (std::numeric_limits<TS>::is_modulo)"},
{"lineNum":"  385","line":"    return static_cast<TS>(value);"},
{"lineNum":"  386","line":""},
{"lineNum":"  387","line":"  // Avoid using implementation-defined unsigned to signed conversions."},
{"lineNum":"  388","line":"  // To learn more, see https://stackoverflow.com/questions/13150449."},
{"lineNum":"  389","line":"  if (value <= std::numeric_limits<TS>::max()) {"},
{"lineNum":"  390","line":"    return static_cast<TS>(value);"},
{"lineNum":"  391","line":"  } else {"},
{"lineNum":"  392","line":"    constexpr auto TS_min = std::numeric_limits<TS>::min();"},
{"lineNum":"  393","line":"    return TS_min + static_cast<TS>(value - TS_min);"},
{"lineNum":"  394","line":"  }"},
{"lineNum":"  395","line":"}"},
{"lineNum":"  396","line":""},
{"lineNum":"  397","line":"#endif // LLVM_FUZZER_FUZZED_DATA_PROVIDER_H_"},
{"lineNum":"  398","line":""},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bech32_fuzz_2_gcc_instrumented", "date" : "2023-07-28 14:48:03", "instrumented" : 54, "covered" : 0,};
var merged_data = [];
