var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2009-2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2015 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#ifndef BITCOIN_SUPPORT_ALLOCATORS_ZEROAFTERFREE_H"},
{"lineNum":"    7","line":"#define BITCOIN_SUPPORT_ALLOCATORS_ZEROAFTERFREE_H"},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"#include \"../cleanse.h\""},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"#include <memory>"},
{"lineNum":"   12","line":"#include <vector>"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"template <typename T>"},
{"lineNum":"   15","line":"struct zero_after_free_allocator : public std::allocator<T> {"},
{"lineNum":"   16","line":"    // MSVC8 default copy constructor is broken"},
{"lineNum":"   17","line":"    typedef std::allocator<T> base;"},
{"lineNum":"   18","line":"    typedef typename base::size_type size_type;"},
{"lineNum":"   19","line":"    typedef typename base::difference_type difference_type;"},
{"lineNum":"   20","line":"    typedef typename base::pointer pointer;"},
{"lineNum":"   21","line":"    typedef typename base::const_pointer const_pointer;"},
{"lineNum":"   22","line":"    typedef typename base::reference reference;"},
{"lineNum":"   23","line":"    typedef typename base::const_reference const_reference;"},
{"lineNum":"   24","line":"    typedef typename base::value_type value_type;"},
{"lineNum":"   25","line":"    zero_after_free_allocator() throw() {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   26","line":"    zero_after_free_allocator(const zero_after_free_allocator& a) throw() : base(a) {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   27","line":"    template <typename U>"},
{"lineNum":"   28","line":"    zero_after_free_allocator(const zero_after_free_allocator<U>& a) throw() : base(a)"},
{"lineNum":"   29","line":"    {"},
{"lineNum":"   30","line":"    }"},
{"lineNum":"   31","line":"    ~zero_after_free_allocator() throw() {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":"    template <typename _Other>"},
{"lineNum":"   33","line":"    struct rebind {"},
{"lineNum":"   34","line":"        typedef zero_after_free_allocator<_Other> other;"},
{"lineNum":"   35","line":"    };"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    void deallocate(T* p, std::size_t n)"},
{"lineNum":"   38","line":"    {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   39","line":"        if (p != NULL)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"            memory_cleanse(p, sizeof(T) * n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"        std::allocator<T>::deallocate(p, n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"};"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"// Byte-vector that clears its contents before deletion."},
{"lineNum":"   46","line":"typedef std::vector<char, zero_after_free_allocator<char> > CSerializeData;"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"#endif // BITCOIN_SUPPORT_ALLOCATORS_ZEROAFTERFREE_H"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:27:10", "instrumented" : 8, "covered" : 0,};
var merged_data = [];
