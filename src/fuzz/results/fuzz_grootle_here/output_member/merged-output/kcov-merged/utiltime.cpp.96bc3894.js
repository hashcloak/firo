var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2009-2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2016 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#if defined(HAVE_CONFIG_H)"},
{"lineNum":"    7","line":"#include \"config/bitcoin-config.h\""},
{"lineNum":"    8","line":"#endif"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include \"utiltime.h\""},
{"lineNum":"   11","line":"#include \"tinyformat.h\""},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"#include <boost/date_time/posix_time/posix_time.hpp>"},
{"lineNum":"   14","line":"#include <boost/thread.hpp>"},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"static int64_t nMockTime = 0; //!< For unit testing"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"int64_t GetTime()"},
{"lineNum":"   19","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   20","line":"    if (nMockTime) return nMockTime;","class":"lineNoCov","hits":"0",},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"    time_t now = time(NULL);","class":"lineNoCov","hits":"0",},
{"lineNum":"   23","line":"    assert(now > 0);","class":"lineNoCov","hits":"0",},
{"lineNum":"   24","line":"    return now;","class":"lineNoCov","hits":"0",},
{"lineNum":"   25","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"void SetMockTime(int64_t nMockTimeIn)"},
{"lineNum":"   28","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   29","line":"    nMockTime = nMockTimeIn;","class":"lineNoCov","hits":"0",},
{"lineNum":"   30","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"int64_t GetTimeMillis()"},
{"lineNum":"   33","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   34","line":"    int64_t now = (boost::posix_time::microsec_clock::universal_time() -","class":"lineNoCov","hits":"0",},
{"lineNum":"   35","line":"                   boost::posix_time::ptime(boost::gregorian::date(1970,1,1))).total_milliseconds();","class":"lineNoCov","hits":"0",},
{"lineNum":"   36","line":"    assert(now > 0);","class":"lineNoCov","hits":"0",},
{"lineNum":"   37","line":"    return now;","class":"lineNoCov","hits":"0",},
{"lineNum":"   38","line":"}"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"int64_t GetTimeMicros()"},
{"lineNum":"   41","line":"{","class":"lineCov","hits":"1","order":"938",},
{"lineNum":"   42","line":"    int64_t now = (boost::posix_time::microsec_clock::universal_time() -","class":"lineCov","hits":"1","order":"939",},
{"lineNum":"   43","line":"                   boost::posix_time::ptime(boost::gregorian::date(1970,1,1))).total_microseconds();","class":"lineCov","hits":"1","order":"940",},
{"lineNum":"   44","line":"    assert(now > 0);","class":"lineCov","hits":"1","order":"941",},
{"lineNum":"   45","line":"    return now;","class":"lineCov","hits":"1","order":"942",},
{"lineNum":"   46","line":"}"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"int64_t GetSystemTimeInSeconds()"},
{"lineNum":"   49","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   50","line":"    return GetTimeMicros()/1000000;","class":"lineNoCov","hits":"0",},
{"lineNum":"   51","line":"}"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"/** Return a time useful for the debug log */"},
{"lineNum":"   54","line":"int64_t GetLogTimeMicros()"},
{"lineNum":"   55","line":"{","class":"lineCov","hits":"1","order":"943",},
{"lineNum":"   56","line":"    if (nMockTime) return nMockTime*1000000;","class":"lineCov","hits":"1","order":"944",},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    return GetTimeMicros();","class":"lineCov","hits":"1","order":"932",},
{"lineNum":"   59","line":"}","class":"lineCov","hits":"1","order":"930",},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"void MilliSleep(int64_t n)"},
{"lineNum":"   62","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"/**"},
{"lineNum":"   65","line":" * Boost\'s sleep_for was uninterruptible when backed by nanosleep from 1.50"},
{"lineNum":"   66","line":" * until fixed in 1.52. Use the deprecated sleep method for the broken case."},
{"lineNum":"   67","line":" * See: https://svn.boost.org/trac/boost/ticket/7238"},
{"lineNum":"   68","line":" */"},
{"lineNum":"   69","line":"#if defined(HAVE_WORKING_BOOST_SLEEP_FOR)"},
{"lineNum":"   70","line":"    boost::this_thread::sleep_for(boost::chrono::milliseconds(n));","class":"lineNoCov","hits":"0",},
{"lineNum":"   71","line":"#elif defined(HAVE_WORKING_BOOST_SLEEP)"},
{"lineNum":"   72","line":"    boost::this_thread::sleep(boost::posix_time::milliseconds(n));"},
{"lineNum":"   73","line":"#else"},
{"lineNum":"   74","line":"//should never get here"},
{"lineNum":"   75","line":"#error missing boost sleep implementation"},
{"lineNum":"   76","line":"#endif"},
{"lineNum":"   77","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"std::string DateTimeStrFormat(const char* pszFormat, int64_t nTime)"},
{"lineNum":"   80","line":"{","class":"lineCov","hits":"1","order":"937",},
{"lineNum":"   81","line":"    static std::locale classic(std::locale::classic());","class":"lineCov","hits":"1","order":"936",},
{"lineNum":"   82","line":"    // std::locale takes ownership of the pointer"},
{"lineNum":"   83","line":"    std::locale loc(classic, new boost::posix_time::time_facet(pszFormat));","class":"lineCov","hits":"1","order":"935",},
{"lineNum":"   84","line":"    std::stringstream ss;","class":"lineCov","hits":"1","order":"934",},
{"lineNum":"   85","line":"    ss.imbue(loc);","class":"lineCov","hits":"1","order":"929",},
{"lineNum":"   86","line":"    ss << boost::posix_time::from_time_t(nTime);","class":"lineCov","hits":"1","order":"928",},
{"lineNum":"   87","line":"    return ss.str();","class":"lineCov","hits":"1","order":"933",},
{"lineNum":"   88","line":"}","class":"lineCov","hits":"1","order":"931",},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"std::string DurationToDHMS(int64_t nDurationTime)"},
{"lineNum":"   91","line":"{","class":"lineNoCov","hits":"0",},
{"lineNum":"   92","line":"    int seconds = nDurationTime % 60;","class":"lineNoCov","hits":"0",},
{"lineNum":"   93","line":"    nDurationTime /= 60;","class":"lineNoCov","hits":"0",},
{"lineNum":"   94","line":"    int minutes = nDurationTime % 60;","class":"lineNoCov","hits":"0",},
{"lineNum":"   95","line":"    nDurationTime /= 60;","class":"lineNoCov","hits":"0",},
{"lineNum":"   96","line":"    int hours = nDurationTime % 24;","class":"lineNoCov","hits":"0",},
{"lineNum":"   97","line":"    int days = nDurationTime / 24;","class":"lineNoCov","hits":"0",},
{"lineNum":"   98","line":"    if(days)","class":"lineNoCov","hits":"0",},
{"lineNum":"   99","line":"        return strprintf(\"%dd %02dh:%02dm:%02ds\", days, hours, minutes, seconds);","class":"lineNoCov","hits":"0",},
{"lineNum":"  100","line":"    if(hours)","class":"lineNoCov","hits":"0",},
{"lineNum":"  101","line":"        return strprintf(\"%02dh:%02dm:%02ds\", hours, minutes, seconds);","class":"lineNoCov","hits":"0",},
{"lineNum":"  102","line":"    return strprintf(\"%02dm:%02ds\", minutes, seconds);","class":"lineNoCov","hits":"0",},
{"lineNum":"  103","line":"}","class":"lineNoCov","hits":"0",},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "", "date" : "2023-08-24 10:21:39", "instrumented" : 49, "covered" : 17,};
var merged_data = [];
