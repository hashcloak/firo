var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2009-2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2016 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"/**"},
{"lineNum":"    7","line":" * Server/client environment: argument handling, config file parsing,"},
{"lineNum":"    8","line":" * logging, thread wrappers"},
{"lineNum":"    9","line":" */"},
{"lineNum":"   10","line":"#ifndef BITCOIN_UTIL_H"},
{"lineNum":"   11","line":"#define BITCOIN_UTIL_H"},
{"lineNum":"   12","line":"#define for_loop                for (;;)"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"#if defined(HAVE_CONFIG_H)"},
{"lineNum":"   15","line":"#include \"config/bitcoin-config.h\""},
{"lineNum":"   16","line":"#endif"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"#include \"compat.h\""},
{"lineNum":"   19","line":"#include \"tinyformat.h\""},
{"lineNum":"   20","line":"#include \"utiltime.h\""},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"#include <atomic>"},
{"lineNum":"   23","line":"#include <exception>"},
{"lineNum":"   24","line":"#include <map>"},
{"lineNum":"   25","line":"#include <stdint.h>"},
{"lineNum":"   26","line":"#include <string>"},
{"lineNum":"   27","line":"#include <unordered_map>"},
{"lineNum":"   28","line":"#include <vector>"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"#include <boost/filesystem/path.hpp>"},
{"lineNum":"   31","line":"#include <boost/signals2/signal.hpp>"},
{"lineNum":"   32","line":"#include <boost/thread/exceptions.hpp>"},
{"lineNum":"   33","line":"#include <boost/optional.hpp>"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"#include <boost/bind/bind.hpp>"},
{"lineNum":"   36","line":"// workaround for boost::placeholders namespace missing during use"},
{"lineNum":"   37","line":"namespace boost { namespace placeholders {}}"},
{"lineNum":"   38","line":"using namespace boost::placeholders;"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"static const bool DEFAULT_LOGTIMEMICROS = false;"},
{"lineNum":"   41","line":"static const bool DEFAULT_LOGIPS        = false;"},
{"lineNum":"   42","line":"static const bool DEFAULT_LOGTIMESTAMPS = true;"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"/** Signals for translation. */"},
{"lineNum":"   45","line":"class CTranslationInterface","class":"linePartCov","hits":"2","order":"77","possible_hits":"4",},
{"lineNum":"   46","line":"{"},
{"lineNum":"   47","line":"public:"},
{"lineNum":"   48","line":"    /** Translate a message to the native language of the user. */"},
{"lineNum":"   49","line":"    boost::signals2::signal<std::string (const char* psz)> Translate;"},
{"lineNum":"   50","line":"};"},
{"lineNum":"   51","line":"extern bool fMasternodeMode;"},
{"lineNum":"   52","line":"extern bool fLiteMode;"},
{"lineNum":"   53","line":"extern int nWalletBackups;"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"extern const std::map<std::string, std::vector<std::string> >& mapMultiArgs;"},
{"lineNum":"   56","line":"extern bool fDebug;"},
{"lineNum":"   57","line":"extern bool fPrintToConsole;"},
{"lineNum":"   58","line":"extern bool fPrintToDebugLog;"},
{"lineNum":"   59","line":"extern bool fNoDebug;"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"extern bool fLogTimestamps;"},
{"lineNum":"   62","line":"extern bool fLogTimeMicros;"},
{"lineNum":"   63","line":"extern bool fLogIPs;"},
{"lineNum":"   64","line":"extern std::atomic<bool> fReopenDebugLog;"},
{"lineNum":"   65","line":"extern CTranslationInterface translationInterface;"},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"/** Flag to indicate, whether the Elysium log file should be reopened. */"},
{"lineNum":"   68","line":"extern std::atomic<bool> fReopenElysiumLog;"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"extern const char * const BITCOIN_CONF_FILENAME;"},
{"lineNum":"   71","line":"extern const char * const BITCOIN_PID_FILENAME;"},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"extern bool fSkipMnpayoutCheck;"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"/**"},
{"lineNum":"   76","line":" * Translation function: Call Translate signal on UI interface, which returns a boost::optional result."},
{"lineNum":"   77","line":" * If no translation slot is registered, nothing is returned, and simply return the input."},
{"lineNum":"   78","line":" */"},
{"lineNum":"   79","line":"inline std::string _(const char* psz)"},
{"lineNum":"   80","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   81","line":"    boost::optional<std::string> rv = translationInterface.Translate(psz);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    return rv ? (*rv) : psz;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   83","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"inline int roundint(double d)"},
{"lineNum":"   86","line":"{"},
{"lineNum":"   87","line":"    return (int)(d > 0 ? d + 0.5 : d - 0.5);"},
{"lineNum":"   88","line":"}"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"inline int64_t roundint64(double d)"},
{"lineNum":"   91","line":"{"},
{"lineNum":"   92","line":"    return (int64_t)(d > 0 ? d + 0.5 : d - 0.5);"},
{"lineNum":"   93","line":"}"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"void SetupEnvironment();"},
{"lineNum":"   96","line":"bool SetupNetworking();"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"/** Return true if log accepts specified category */"},
{"lineNum":"   99","line":"bool LogAcceptCategory(const char* category);"},
{"lineNum":"  100","line":"/** Send a string to the log output */"},
{"lineNum":"  101","line":"int LogPrintStr(const std::string &str);"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"#define LogPrint(category, ...) do { \\"},
{"lineNum":"  104","line":"    if (LogAcceptCategory((category))) { \\"},
{"lineNum":"  105","line":"        LogPrintStr(tfm::format(__VA_ARGS__)); \\"},
{"lineNum":"  106","line":"    } \\"},
{"lineNum":"  107","line":"} while(0)"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"#define LogPrintf(...) do { \\"},
{"lineNum":"  110","line":"    LogPrintStr(tfm::format(__VA_ARGS__)); \\"},
{"lineNum":"  111","line":"} while(0)"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"template<typename... Args>"},
{"lineNum":"  114","line":"bool error(const char* fmt, const Args&... args)"},
{"lineNum":"  115","line":"{"},
{"lineNum":"  116","line":"    LogPrintStr(\"ERROR: \" + tfm::format(fmt, args...) + \"\\n\");"},
{"lineNum":"  117","line":"    return false;"},
{"lineNum":"  118","line":"}"},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"void PrintExceptionContinue(const std::exception_ptr pex, const char* pszThread);"},
{"lineNum":"  121","line":"void ParseParameters(int argc, const char*const argv[]);"},
{"lineNum":"  122","line":"void FileCommit(FILE *file);"},
{"lineNum":"  123","line":"bool TruncateFile(FILE *file, unsigned int length);"},
{"lineNum":"  124","line":"int RaiseFileDescriptorLimit(int nMinFD);"},
{"lineNum":"  125","line":"void AllocateFileRange(FILE *file, unsigned int offset, unsigned int length);"},
{"lineNum":"  126","line":"bool RenameOver(boost::filesystem::path src, boost::filesystem::path dest);"},
{"lineNum":"  127","line":"bool TryCreateDirectory(const boost::filesystem::path& p);"},
{"lineNum":"  128","line":"boost::filesystem::path GetDefaultDataDirForCoinName(const std::string &coinName);"},
{"lineNum":"  129","line":"boost::filesystem::path GetDefaultDataDir();"},
{"lineNum":"  130","line":"const boost::filesystem::path &GetDataDir(bool fNetSpecific = true);"},
{"lineNum":"  131","line":"const boost::filesystem::path &GetBackupsDir();"},
{"lineNum":"  132","line":"bool RenameDirectoriesFromZcoinToFiro();"},
{"lineNum":"  133","line":"void ClearDatadirCache();"},
{"lineNum":"  134","line":"boost::filesystem::path GetConfigFile(const std::string& confPath);"},
{"lineNum":"  135","line":"#ifndef WIN32"},
{"lineNum":"  136","line":"boost::filesystem::path GetPidFile();"},
{"lineNum":"  137","line":"void CreatePidFile(const boost::filesystem::path &path, pid_t pid);"},
{"lineNum":"  138","line":"#endif"},
{"lineNum":"  139","line":"void ReadConfigFile(const std::string& confPath);"},
{"lineNum":"  140","line":"#ifdef WIN32"},
{"lineNum":"  141","line":"boost::filesystem::path GetSpecialFolderPath(int nFolder, bool fCreate = true);"},
{"lineNum":"  142","line":"#endif"},
{"lineNum":"  143","line":"void OpenDebugLog();"},
{"lineNum":"  144","line":"void ShrinkDebugFile();"},
{"lineNum":"  145","line":"void runCommand(const std::string& strCommand);"},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"inline bool IsSwitchChar(char c)"},
{"lineNum":"  148","line":"{"},
{"lineNum":"  149","line":"#ifdef WIN32"},
{"lineNum":"  150","line":"    return c == \'-\' || c == \'/\';"},
{"lineNum":"  151","line":"#else"},
{"lineNum":"  152","line":"    return c == \'-\';"},
{"lineNum":"  153","line":"#endif"},
{"lineNum":"  154","line":"}"},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"/**"},
{"lineNum":"  157","line":" * Return true if the given argument has been manually set"},
{"lineNum":"  158","line":" *"},
{"lineNum":"  159","line":" * @param strArg Argument to get (e.g. \"-foo\")"},
{"lineNum":"  160","line":" * @return true if the argument has been set"},
{"lineNum":"  161","line":" */"},
{"lineNum":"  162","line":"bool IsArgSet(const std::string& strArg);"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"/**"},
{"lineNum":"  165","line":" * Return string argument or default value"},
{"lineNum":"  166","line":" *"},
{"lineNum":"  167","line":" * @param strArg Argument to get (e.g. \"-foo\")"},
{"lineNum":"  168","line":" * @param default (e.g. \"1\")"},
{"lineNum":"  169","line":" * @return command-line argument or default value"},
{"lineNum":"  170","line":" */"},
{"lineNum":"  171","line":"std::string GetArg(const std::string& strArg, const std::string& strDefault);"},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"/**"},
{"lineNum":"  174","line":" * Return integer argument or default value"},
{"lineNum":"  175","line":" *"},
{"lineNum":"  176","line":" * @param strArg Argument to get (e.g. \"-foo\")"},
{"lineNum":"  177","line":" * @param default (e.g. 1)"},
{"lineNum":"  178","line":" * @return command-line argument (0 if invalid number) or default value"},
{"lineNum":"  179","line":" */"},
{"lineNum":"  180","line":"int64_t GetArg(const std::string& strArg, int64_t nDefault);"},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"/**"},
{"lineNum":"  183","line":" * Return boolean argument or default value"},
{"lineNum":"  184","line":" *"},
{"lineNum":"  185","line":" * @param strArg Argument to get (e.g. \"-foo\")"},
{"lineNum":"  186","line":" * @param default (true or false)"},
{"lineNum":"  187","line":" * @return command-line argument or default value"},
{"lineNum":"  188","line":" */"},
{"lineNum":"  189","line":"bool GetBoolArg(const std::string& strArg, bool fDefault);"},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"/**"},
{"lineNum":"  192","line":" * Return boost:optional<bool> for a specified argument"},
{"lineNum":"  193","line":" *"},
{"lineNum":"  194","line":" * @param strArg Argument to get (e.g. \"-foo\")"},
{"lineNum":"  195","line":" * @return command-line argument or default value"},
{"lineNum":"  196","line":" */"},
{"lineNum":"  197","line":"boost::optional<bool> GetOptBoolArg(const std::string& strArg);"},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"/**"},
{"lineNum":"  200","line":" * Set an argument if it doesn\'t already have a value"},
{"lineNum":"  201","line":" *"},
{"lineNum":"  202","line":" * @param strArg Argument to set (e.g. \"-foo\")"},
{"lineNum":"  203","line":" * @param strValue Value (e.g. \"1\")"},
{"lineNum":"  204","line":" * @return true if argument gets set, false if it already had a value"},
{"lineNum":"  205","line":" */"},
{"lineNum":"  206","line":"bool SoftSetArg(const std::string& strArg, const std::string& strValue);"},
{"lineNum":"  207","line":""},
{"lineNum":"  208","line":"/**"},
{"lineNum":"  209","line":" * Set a boolean argument if it doesn\'t already have a value"},
{"lineNum":"  210","line":" *"},
{"lineNum":"  211","line":" * @param strArg Argument to set (e.g. \"-foo\")"},
{"lineNum":"  212","line":" * @param fValue Value (e.g. false)"},
{"lineNum":"  213","line":" * @return true if argument gets set, false if it already had a value"},
{"lineNum":"  214","line":" */"},
{"lineNum":"  215","line":"bool SoftSetBoolArg(const std::string& strArg, bool fValue);"},
{"lineNum":"  216","line":""},
{"lineNum":"  217","line":"// Forces a arg setting, used only in testing"},
{"lineNum":"  218","line":"void ForceSetArg(const std::string& strArg, const std::string& strValue);"},
{"lineNum":"  219","line":""},
{"lineNum":"  220","line":"/**"},
{"lineNum":"  221","line":" * Format a string to be used as group of options in help messages"},
{"lineNum":"  222","line":" *"},
{"lineNum":"  223","line":" * @param message Group name (e.g. \"RPC server options:\")"},
{"lineNum":"  224","line":" * @return the formatted string"},
{"lineNum":"  225","line":" */"},
{"lineNum":"  226","line":"std::string HelpMessageGroup(const std::string& message);"},
{"lineNum":"  227","line":""},
{"lineNum":"  228","line":"/**"},
{"lineNum":"  229","line":" * Format a string to be used as option description in help messages"},
{"lineNum":"  230","line":" *"},
{"lineNum":"  231","line":" * @param option Option message (e.g. \"-rpcuser=<user>\")"},
{"lineNum":"  232","line":" * @param message Option description (e.g. \"Username for JSON-RPC connections\")"},
{"lineNum":"  233","line":" * @return the formatted string"},
{"lineNum":"  234","line":" */"},
{"lineNum":"  235","line":"std::string HelpMessageOpt(const std::string& option, const std::string& message);"},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"/**"},
{"lineNum":"  238","line":" * Return the number of physical cores available on the current system."},
{"lineNum":"  239","line":" * @note This does not count virtual cores, such as those provided by HyperThreading"},
{"lineNum":"  240","line":" * when boost is newer than 1.56."},
{"lineNum":"  241","line":" */"},
{"lineNum":"  242","line":"int GetNumCores();"},
{"lineNum":"  243","line":"void SetThreadPriority(int nPriority);"},
{"lineNum":"  244","line":""},
{"lineNum":"  245","line":"void RenameThread(const char* name);"},
{"lineNum":"  246","line":"std::string GetThreadName();"},
{"lineNum":"  247","line":""},
{"lineNum":"  248","line":"namespace ctpl {"},
{"lineNum":"  249","line":"    class thread_pool;"},
{"lineNum":"  250","line":"}"},
{"lineNum":"  251","line":"void RenameThreadPool(ctpl::thread_pool& tp, const char* baseName);"},
{"lineNum":"  252","line":""},
{"lineNum":"  253","line":""},
{"lineNum":"  254","line":"/**"},
{"lineNum":"  255","line":" * .. and a wrapper that just calls func once"},
{"lineNum":"  256","line":" */"},
{"lineNum":"  257","line":"template <typename Callable> void TraceThread(const char* name,  Callable func)"},
{"lineNum":"  258","line":"{"},
{"lineNum":"  259","line":"    std::string s = strprintf(\"firo-%s\", name);"},
{"lineNum":"  260","line":"    RenameThread(s.c_str());"},
{"lineNum":"  261","line":"    try"},
{"lineNum":"  262","line":"    {"},
{"lineNum":"  263","line":"        LogPrintf(\"%s thread start\\n\", name);"},
{"lineNum":"  264","line":"        func();"},
{"lineNum":"  265","line":"        LogPrintf(\"%s thread exit\\n\", name);"},
{"lineNum":"  266","line":"    }"},
{"lineNum":"  267","line":"    catch (const boost::thread_interrupted&)"},
{"lineNum":"  268","line":"    {"},
{"lineNum":"  269","line":"        LogPrintf(\"%s thread interrupt\\n\", name);"},
{"lineNum":"  270","line":"        throw;"},
{"lineNum":"  271","line":"    }"},
{"lineNum":"  272","line":"    catch (...) {"},
{"lineNum":"  273","line":"        PrintExceptionContinue(std::current_exception(), name);"},
{"lineNum":"  274","line":"        throw;"},
{"lineNum":"  275","line":"    }"},
{"lineNum":"  276","line":"}"},
{"lineNum":"  277","line":""},
{"lineNum":"  278","line":"std::string CopyrightHolders(const std::string& strPrefix);"},
{"lineNum":"  279","line":""},
{"lineNum":"  280","line":"#endif // BITCOIN_UTIL_H"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "grootle_fuzz_debug", "date" : "2023-08-17 10:23:44", "instrumented" : 5, "covered" : 1,};
var merged_data = [];
