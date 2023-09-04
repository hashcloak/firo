var data = {lines:[
{"lineNum":"    1","line":""},
{"lineNum":"    2","line":"/*********************************************************"},
{"lineNum":"    3","line":" *"},
{"lineNum":"    4","line":" *  Copyright (C) 2014 by Vitaliy Vitsentiy"},
{"lineNum":"    5","line":" *"},
{"lineNum":"    6","line":" *  Licensed under the Apache License, Version 2.0 (the \"License\");"},
{"lineNum":"    7","line":" *  you may not use this file except in compliance with the License."},
{"lineNum":"    8","line":" *  You may obtain a copy of the License at"},
{"lineNum":"    9","line":" *"},
{"lineNum":"   10","line":" *     http://www.apache.org/licenses/LICENSE-2.0"},
{"lineNum":"   11","line":" *"},
{"lineNum":"   12","line":" *  Unless required by applicable law or agreed to in writing, software"},
{"lineNum":"   13","line":" *  distributed under the License is distributed on an \"AS IS\" BASIS,"},
{"lineNum":"   14","line":" *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied."},
{"lineNum":"   15","line":" *  See the License for the specific language governing permissions and"},
{"lineNum":"   16","line":" *  limitations under the License."},
{"lineNum":"   17","line":" *"},
{"lineNum":"   18","line":" *********************************************************/"},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"#ifndef __ctpl_thread_pool_H__"},
{"lineNum":"   22","line":"#define __ctpl_thread_pool_H__"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"#include <functional>"},
{"lineNum":"   25","line":"#include <thread>"},
{"lineNum":"   26","line":"#include <atomic>"},
{"lineNum":"   27","line":"#include <vector>"},
{"lineNum":"   28","line":"#include <memory>"},
{"lineNum":"   29","line":"#include <exception>"},
{"lineNum":"   30","line":"#include <future>"},
{"lineNum":"   31","line":"#include <mutex>"},
{"lineNum":"   32","line":"#include <boost/lockfree/queue.hpp>"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"#ifndef _ctplThreadPoolLength_"},
{"lineNum":"   36","line":"#define _ctplThreadPoolLength_  100"},
{"lineNum":"   37","line":"#endif"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"// thread pool to run user\'s functors with signature"},
{"lineNum":"   41","line":"//      ret func(int id, other_params)"},
{"lineNum":"   42","line":"// where id is the index of the thread that runs the functor"},
{"lineNum":"   43","line":"// ret is some return type"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"namespace ctpl {"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    class thread_pool {"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    public:"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"        thread_pool() : q(_ctplThreadPoolLength_) { this->init(); }"},
{"lineNum":"   53","line":"        thread_pool(int nThreads, int queueSize = _ctplThreadPoolLength_) : q(queueSize) { this->init(); this->resize(nThreads); }"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"        // the destructor waits for all the functions in the queue to be finished"},
{"lineNum":"   56","line":"        ~thread_pool() {"},
{"lineNum":"   57","line":"            this->stop(true);"},
{"lineNum":"   58","line":"        }"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"        // get the number of running threads in the pool"},
{"lineNum":"   61","line":"        int size() { return static_cast<int>(this->threads.size()); }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"        // number of idle threads"},
{"lineNum":"   64","line":"        int n_idle() { return this->nWaiting; }"},
{"lineNum":"   65","line":"        std::thread & get_thread(int i) { return *this->threads[i]; }"},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"        // change the number of threads in the pool"},
{"lineNum":"   68","line":"        // should be called from one thread, otherwise be careful to not interleave, also with this->stop()"},
{"lineNum":"   69","line":"        // nThreads must be >= 0"},
{"lineNum":"   70","line":"        void resize(int nThreads) {"},
{"lineNum":"   71","line":"            if (!this->isStop && !this->isDone) {"},
{"lineNum":"   72","line":"                int oldNThreads = static_cast<int>(this->threads.size());"},
{"lineNum":"   73","line":"                if (oldNThreads <= nThreads) {  // if the number of threads is increased"},
{"lineNum":"   74","line":"                    this->threads.resize(nThreads);"},
{"lineNum":"   75","line":"                    this->flags.resize(nThreads);"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"                    for (int i = oldNThreads; i < nThreads; ++i) {"},
{"lineNum":"   78","line":"                        this->flags[i] = std::make_shared<std::atomic<bool>>(false);"},
{"lineNum":"   79","line":"                        this->set_thread(i);"},
{"lineNum":"   80","line":"                    }"},
{"lineNum":"   81","line":"                }"},
{"lineNum":"   82","line":"                else {  // the number of threads is decreased"},
{"lineNum":"   83","line":"                    for (int i = oldNThreads - 1; i >= nThreads; --i) {"},
{"lineNum":"   84","line":"                        *this->flags[i] = true;  // this thread will finish"},
{"lineNum":"   85","line":"                        this->threads[i]->detach();"},
{"lineNum":"   86","line":"                    }"},
{"lineNum":"   87","line":"                    {"},
{"lineNum":"   88","line":"                        // stop the detached threads that were waiting"},
{"lineNum":"   89","line":"                        std::unique_lock<std::mutex> lock(this->mutex);"},
{"lineNum":"   90","line":"                        this->cv.notify_all();"},
{"lineNum":"   91","line":"                    }"},
{"lineNum":"   92","line":"                    this->threads.resize(nThreads);  // safe to delete because the threads are detached"},
{"lineNum":"   93","line":"                    this->flags.resize(nThreads);  // safe to delete because the threads have copies of shared_ptr of the flags, not originals"},
{"lineNum":"   94","line":"                }"},
{"lineNum":"   95","line":"            }"},
{"lineNum":"   96","line":"        }"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"        // empty the queue"},
{"lineNum":"   99","line":"        void clear_queue() {"},
{"lineNum":"  100","line":"            std::function<void(int id)> * _f;"},
{"lineNum":"  101","line":"            while (this->q.pop(_f))"},
{"lineNum":"  102","line":"                delete _f;  // empty the queue"},
{"lineNum":"  103","line":"        }"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"        // pops a functional wraper to the original function"},
{"lineNum":"  106","line":"        std::function<void(int)> pop() {"},
{"lineNum":"  107","line":"            std::function<void(int id)> * _f = nullptr;"},
{"lineNum":"  108","line":"            this->q.pop(_f);"},
{"lineNum":"  109","line":"            std::unique_ptr<std::function<void(int id)>> func(_f);  // at return, delete the function even if an exception occurred"},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"            std::function<void(int)> f;"},
{"lineNum":"  112","line":"            if (_f)"},
{"lineNum":"  113","line":"                f = *_f;"},
{"lineNum":"  114","line":"            return f;"},
{"lineNum":"  115","line":"        }"},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"        // wait for all computing threads to finish and stop all threads"},
{"lineNum":"  119","line":"        // may be called asyncronously to not pause the calling thread while waiting"},
{"lineNum":"  120","line":"        // if isWait == true, all the functions in the queue are run, otherwise the queue is cleared without running the functions"},
{"lineNum":"  121","line":"        void stop(bool isWait = false) {"},
{"lineNum":"  122","line":"            if (!isWait) {"},
{"lineNum":"  123","line":"                if (this->isStop)"},
{"lineNum":"  124","line":"                    return;"},
{"lineNum":"  125","line":"                this->isStop = true;"},
{"lineNum":"  126","line":"                for (int i = 0, n = this->size(); i < n; ++i) {"},
{"lineNum":"  127","line":"                    *this->flags[i] = true;  // command the threads to stop"},
{"lineNum":"  128","line":"                }"},
{"lineNum":"  129","line":"                this->clear_queue();  // empty the queue"},
{"lineNum":"  130","line":"            }"},
{"lineNum":"  131","line":"            else {"},
{"lineNum":"  132","line":"                if (this->isDone || this->isStop)"},
{"lineNum":"  133","line":"                    return;"},
{"lineNum":"  134","line":"                this->isDone = true;  // give the waiting threads a command to finish"},
{"lineNum":"  135","line":"            }"},
{"lineNum":"  136","line":"            {"},
{"lineNum":"  137","line":"                std::unique_lock<std::mutex> lock(this->mutex);"},
{"lineNum":"  138","line":"                this->cv.notify_all();  // stop all waiting threads"},
{"lineNum":"  139","line":"            }"},
{"lineNum":"  140","line":"            for (int i = 0; i < static_cast<int>(this->threads.size()); ++i) {  // wait for the computing threads to finish"},
{"lineNum":"  141","line":"                if (this->threads[i]->joinable())"},
{"lineNum":"  142","line":"                    this->threads[i]->join();"},
{"lineNum":"  143","line":"            }"},
{"lineNum":"  144","line":"            // if there were no threads in the pool but some functors in the queue, the functors are not deleted by the threads"},
{"lineNum":"  145","line":"            // therefore delete them here"},
{"lineNum":"  146","line":"            this->clear_queue();"},
{"lineNum":"  147","line":"            this->threads.clear();"},
{"lineNum":"  148","line":"            this->flags.clear();"},
{"lineNum":"  149","line":"        }"},
{"lineNum":"  150","line":""},
{"lineNum":"  151","line":"        template<typename F, typename... Rest>"},
{"lineNum":"  152","line":"        auto push(F && f, Rest&&... rest) ->std::future<decltype(f(0, rest...))> {"},
{"lineNum":"  153","line":"            auto pck = std::make_shared<std::packaged_task<decltype(f(0, rest...))(int)>>("},
{"lineNum":"  154","line":"                std::bind(std::forward<F>(f), std::placeholders::_1, std::forward<Rest>(rest)...)"},
{"lineNum":"  155","line":"            );"},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"            auto _f = new std::function<void(int id)>([pck](int id) {"},
{"lineNum":"  158","line":"                (*pck)(id);"},
{"lineNum":"  159","line":"            });"},
{"lineNum":"  160","line":"            this->q.push(_f);"},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"            std::unique_lock<std::mutex> lock(this->mutex);"},
{"lineNum":"  163","line":"            this->cv.notify_one();"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"            return pck->get_future();"},
{"lineNum":"  166","line":"        }"},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"        // run the user\'s function that excepts argument int - id of the running thread. returned value is templatized"},
{"lineNum":"  169","line":"        // operator returns std::future, where the user can get the result and rethrow the catched exceptins"},
{"lineNum":"  170","line":"        template<typename F>"},
{"lineNum":"  171","line":"        auto push(F && f) ->std::future<decltype(f(0))> {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  172","line":"            auto pck = std::make_shared<std::packaged_task<decltype(f(0))(int)>>(std::forward<F>(f));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"            auto _f = new std::function<void(int id)>([pck](int id) {","class":"lineNoCov","hits":"0","possible_hits":"10",},
{"lineNum":"  175","line":"                (*pck)(id);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"            });","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  177","line":"            this->q.push(_f);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"            std::unique_lock<std::mutex> lock(this->mutex);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"            this->cv.notify_one();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"            return pck->get_future();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  184","line":""},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"    private:"},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"        // deleted"},
{"lineNum":"  189","line":"        thread_pool(const thread_pool &);// = delete;"},
{"lineNum":"  190","line":"        thread_pool(thread_pool &&);// = delete;"},
{"lineNum":"  191","line":"        thread_pool & operator=(const thread_pool &);// = delete;"},
{"lineNum":"  192","line":"        thread_pool & operator=(thread_pool &&);// = delete;"},
{"lineNum":"  193","line":""},
{"lineNum":"  194","line":"        void set_thread(int i) {"},
{"lineNum":"  195","line":"            std::shared_ptr<std::atomic<bool>> flag(this->flags[i]);  // a copy of the shared ptr to the flag"},
{"lineNum":"  196","line":"            auto f = [this, i, flag/* a copy of the shared ptr to the flag */]() {"},
{"lineNum":"  197","line":"                std::atomic<bool> & _flag = *flag;"},
{"lineNum":"  198","line":"                std::function<void(int id)> * _f;"},
{"lineNum":"  199","line":"                bool isPop = this->q.pop(_f);"},
{"lineNum":"  200","line":"                while (true) {"},
{"lineNum":"  201","line":"                    while (isPop) {  // if there is anything in the queue"},
{"lineNum":"  202","line":"                        std::unique_ptr<std::function<void(int id)>> func(_f);  // at return, delete the function even if an exception occurred"},
{"lineNum":"  203","line":"                        (*_f)(i);"},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"                        if (_flag)"},
{"lineNum":"  206","line":"                            return;  // the thread is wanted to stop, return even if the queue is not empty yet"},
{"lineNum":"  207","line":"                        else"},
{"lineNum":"  208","line":"                            isPop = this->q.pop(_f);"},
{"lineNum":"  209","line":"                    }"},
{"lineNum":"  210","line":""},
{"lineNum":"  211","line":"                    // the queue is empty here, wait for the next command"},
{"lineNum":"  212","line":"                    std::unique_lock<std::mutex> lock(this->mutex);"},
{"lineNum":"  213","line":"                    ++this->nWaiting;"},
{"lineNum":"  214","line":"                    this->cv.wait(lock, [this, &_f, &isPop, &_flag](){ isPop = this->q.pop(_f); return isPop || this->isDone || _flag; });"},
{"lineNum":"  215","line":"                    --this->nWaiting;"},
{"lineNum":"  216","line":""},
{"lineNum":"  217","line":"                    if (!isPop)"},
{"lineNum":"  218","line":"                        return;  // if the queue is empty and this->isDone == true or *flag then return"},
{"lineNum":"  219","line":"                }"},
{"lineNum":"  220","line":"            };"},
{"lineNum":"  221","line":"            this->threads[i].reset(new std::thread(f));  // compiler may not support std::make_unique()"},
{"lineNum":"  222","line":"        }"},
{"lineNum":"  223","line":""},
{"lineNum":"  224","line":"        void init() { this->nWaiting = 0; this->isStop = false; this->isDone = false; }"},
{"lineNum":"  225","line":""},
{"lineNum":"  226","line":"        std::vector<std::unique_ptr<std::thread>> threads;"},
{"lineNum":"  227","line":"        std::vector<std::shared_ptr<std::atomic<bool>>> flags;"},
{"lineNum":"  228","line":"        mutable boost::lockfree::queue<std::function<void(int id)> *> q;"},
{"lineNum":"  229","line":"        std::atomic<bool> isDone;"},
{"lineNum":"  230","line":"        std::atomic<bool> isStop;"},
{"lineNum":"  231","line":"        std::atomic<int> nWaiting;  // how many threads are waiting"},
{"lineNum":"  232","line":""},
{"lineNum":"  233","line":"        std::mutex mutex;"},
{"lineNum":"  234","line":"        std::condition_variable cv;"},
{"lineNum":"  235","line":"    };"},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"}"},
{"lineNum":"  238","line":""},
{"lineNum":"  239","line":"#endif // __ctpl_thread_pool_H__"},
{"lineNum":"  240","line":""},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "spend_transaction_debug", "date" : "2023-08-30 09:57:29", "instrumented" : 11, "covered" : 0,};
var merged_data = [];
