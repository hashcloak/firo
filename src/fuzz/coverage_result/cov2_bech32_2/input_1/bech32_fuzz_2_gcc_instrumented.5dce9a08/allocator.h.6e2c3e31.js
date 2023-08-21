var data = {lines:[
{"lineNum":"    1","line":"// Allocators -*- C++ -*-"},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"// Copyright (C) 2001-2019 Free Software Foundation, Inc."},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This file is part of the GNU ISO C++ Library.  This library is free"},
{"lineNum":"    6","line":"// software; you can redistribute it and/or modify it under the"},
{"lineNum":"    7","line":"// terms of the GNU General Public License as published by the"},
{"lineNum":"    8","line":"// Free Software Foundation; either version 3, or (at your option)"},
{"lineNum":"    9","line":"// any later version."},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"// This library is distributed in the hope that it will be useful,"},
{"lineNum":"   12","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   13","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the"},
{"lineNum":"   14","line":"// GNU General Public License for more details."},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"// Under Section 7 of GPL version 3, you are granted additional"},
{"lineNum":"   17","line":"// permissions described in the GCC Runtime Library Exception, version"},
{"lineNum":"   18","line":"// 3.1, as published by the Free Software Foundation."},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"// You should have received a copy of the GNU General Public License and"},
{"lineNum":"   21","line":"// a copy of the GCC Runtime Library Exception along with this program;"},
{"lineNum":"   22","line":"// see the files COPYING3 and COPYING.RUNTIME respectively.  If not, see"},
{"lineNum":"   23","line":"// <http://www.gnu.org/licenses/>."},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"/*"},
{"lineNum":"   26","line":" * Copyright (c) 1996-1997"},
{"lineNum":"   27","line":" * Silicon Graphics Computer Systems, Inc."},
{"lineNum":"   28","line":" *"},
{"lineNum":"   29","line":" * Permission to use, copy, modify, distribute and sell this software"},
{"lineNum":"   30","line":" * and its documentation for any purpose is hereby granted without fee,"},
{"lineNum":"   31","line":" * provided that the above copyright notice appear in all copies and"},
{"lineNum":"   32","line":" * that both that copyright notice and this permission notice appear"},
{"lineNum":"   33","line":" * in supporting documentation.  Silicon Graphics makes no"},
{"lineNum":"   34","line":" * representations about the suitability of this software for any"},
{"lineNum":"   35","line":" * purpose.  It is provided \"as is\" without express or implied warranty."},
{"lineNum":"   36","line":" */"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"/** @file bits/allocator.h"},
{"lineNum":"   39","line":" *  This is an internal header file, included by other library headers."},
{"lineNum":"   40","line":" *  Do not attempt to use it directly. @headername{memory}"},
{"lineNum":"   41","line":" */"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"#ifndef _ALLOCATOR_H"},
{"lineNum":"   44","line":"#define _ALLOCATOR_H 1"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"#include <bits/c++allocator.h> // Define the base class to std::allocator."},
{"lineNum":"   47","line":"#include <bits/memoryfwd.h>"},
{"lineNum":"   48","line":"#if __cplusplus >= 201103L"},
{"lineNum":"   49","line":"#include <type_traits>"},
{"lineNum":"   50","line":"#endif"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"#define __cpp_lib_incomplete_container_elements 201505"},
{"lineNum":"   53","line":"#if __cplusplus >= 201103L"},
{"lineNum":"   54","line":"# define __cpp_lib_allocator_is_always_equal 201411"},
{"lineNum":"   55","line":"#endif"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"namespace std _GLIBCXX_VISIBILITY(default)"},
{"lineNum":"   58","line":"{"},
{"lineNum":"   59","line":"_GLIBCXX_BEGIN_NAMESPACE_VERSION"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"  /**"},
{"lineNum":"   62","line":"   *  @addtogroup allocators"},
{"lineNum":"   63","line":"   *  @{"},
{"lineNum":"   64","line":"   */"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"  /// allocator<void> specialization."},
{"lineNum":"   67","line":"  template<>"},
{"lineNum":"   68","line":"    class allocator<void>"},
{"lineNum":"   69","line":"    {"},
{"lineNum":"   70","line":"    public:"},
{"lineNum":"   71","line":"      typedef size_t      size_type;"},
{"lineNum":"   72","line":"      typedef ptrdiff_t   difference_type;"},
{"lineNum":"   73","line":"      typedef void*       pointer;"},
{"lineNum":"   74","line":"      typedef const void* const_pointer;"},
{"lineNum":"   75","line":"      typedef void        value_type;"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"      template<typename _Tp1>"},
{"lineNum":"   78","line":"\tstruct rebind"},
{"lineNum":"   79","line":"\t{ typedef allocator<_Tp1> other; };"},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"#if __cplusplus >= 201103L"},
{"lineNum":"   82","line":"      // _GLIBCXX_RESOLVE_LIB_DEFECTS"},
{"lineNum":"   83","line":"      // 2103. std::allocator propagate_on_container_move_assignment"},
{"lineNum":"   84","line":"      typedef true_type propagate_on_container_move_assignment;"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"      typedef true_type is_always_equal;"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"      template<typename _Up, typename... _Args>"},
{"lineNum":"   89","line":"\tvoid"},
{"lineNum":"   90","line":"\tconstruct(_Up* __p, _Args&&... __args)"},
{"lineNum":"   91","line":"\tnoexcept(std::is_nothrow_constructible<_Up, _Args...>::value)"},
{"lineNum":"   92","line":"\t{ ::new((void *)__p) _Up(std::forward<_Args>(__args)...); }"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"      template<typename _Up>"},
{"lineNum":"   95","line":"\tvoid"},
{"lineNum":"   96","line":"\tdestroy(_Up* __p)"},
{"lineNum":"   97","line":"\tnoexcept(std::is_nothrow_destructible<_Up>::value)"},
{"lineNum":"   98","line":"\t{ __p->~_Up(); }"},
{"lineNum":"   99","line":"#endif"},
{"lineNum":"  100","line":"    };"},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"  /**"},
{"lineNum":"  103","line":"   * @brief  The @a standard allocator, as per [20.4]."},
{"lineNum":"  104","line":"   *"},
{"lineNum":"  105","line":"   *  See https://gcc.gnu.org/onlinedocs/libstdc++/manual/memory.html#std.util.memory.allocator"},
{"lineNum":"  106","line":"   *  for further details."},
{"lineNum":"  107","line":"   *"},
{"lineNum":"  108","line":"   *  @tparam  _Tp  Type of allocated object."},
{"lineNum":"  109","line":"   */"},
{"lineNum":"  110","line":"  template<typename _Tp>"},
{"lineNum":"  111","line":"    class allocator : public __allocator_base<_Tp>"},
{"lineNum":"  112","line":"    {"},
{"lineNum":"  113","line":"   public:"},
{"lineNum":"  114","line":"      typedef size_t     size_type;"},
{"lineNum":"  115","line":"      typedef ptrdiff_t  difference_type;"},
{"lineNum":"  116","line":"      typedef _Tp*       pointer;"},
{"lineNum":"  117","line":"      typedef const _Tp* const_pointer;"},
{"lineNum":"  118","line":"      typedef _Tp&       reference;"},
{"lineNum":"  119","line":"      typedef const _Tp& const_reference;"},
{"lineNum":"  120","line":"      typedef _Tp        value_type;"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"      template<typename _Tp1>"},
{"lineNum":"  123","line":"\tstruct rebind"},
{"lineNum":"  124","line":"\t{ typedef allocator<_Tp1> other; };"},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"#if __cplusplus >= 201103L"},
{"lineNum":"  127","line":"      // _GLIBCXX_RESOLVE_LIB_DEFECTS"},
{"lineNum":"  128","line":"      // 2103. std::allocator propagate_on_container_move_assignment"},
{"lineNum":"  129","line":"      typedef true_type propagate_on_container_move_assignment;"},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"      typedef true_type is_always_equal;"},
{"lineNum":"  132","line":"#endif"},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"      // _GLIBCXX_RESOLVE_LIB_DEFECTS"},
{"lineNum":"  135","line":"      // 3035. std::allocator\'s constructors should be constexpr"},
{"lineNum":"  136","line":"      _GLIBCXX20_CONSTEXPR"},
{"lineNum":"  137","line":"      allocator() _GLIBCXX_NOTHROW { }","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"      _GLIBCXX20_CONSTEXPR"},
{"lineNum":"  140","line":"      allocator(const allocator& __a) _GLIBCXX_NOTHROW","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  141","line":"      : __allocator_base<_Tp>(__a) { }","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  142","line":""},
{"lineNum":"  143","line":"#if __cplusplus >= 201103L"},
{"lineNum":"  144","line":"      // Avoid implicit deprecation."},
{"lineNum":"  145","line":"      allocator& operator=(const allocator&) = default;"},
{"lineNum":"  146","line":"#endif"},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"      template<typename _Tp1>"},
{"lineNum":"  149","line":"\t_GLIBCXX20_CONSTEXPR"},
{"lineNum":"  150","line":"\tallocator(const allocator<_Tp1>&) _GLIBCXX_NOTHROW { }"},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"      ~allocator() _GLIBCXX_NOTHROW { }","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"      friend bool"},
{"lineNum":"  155","line":"      operator==(const allocator&, const allocator&) _GLIBCXX_NOTHROW"},
{"lineNum":"  156","line":"      { return true; }"},
{"lineNum":"  157","line":""},
{"lineNum":"  158","line":"      friend bool"},
{"lineNum":"  159","line":"      operator!=(const allocator&, const allocator&) _GLIBCXX_NOTHROW"},
{"lineNum":"  160","line":"      { return false; }"},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"      // Inherit everything else."},
{"lineNum":"  163","line":"    };"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"  template<typename _T1, typename _T2>"},
{"lineNum":"  166","line":"    inline bool"},
{"lineNum":"  167","line":"    operator==(const allocator<_T1>&, const allocator<_T2>&)"},
{"lineNum":"  168","line":"    _GLIBCXX_NOTHROW"},
{"lineNum":"  169","line":"    { return true; }"},
{"lineNum":"  170","line":""},
{"lineNum":"  171","line":"  template<typename _T1, typename _T2>"},
{"lineNum":"  172","line":"    inline bool"},
{"lineNum":"  173","line":"    operator!=(const allocator<_T1>&, const allocator<_T2>&)"},
{"lineNum":"  174","line":"    _GLIBCXX_NOTHROW"},
{"lineNum":"  175","line":"    { return false; }"},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"  // Invalid allocator<cv T> partial specializations."},
{"lineNum":"  178","line":"  // allocator_traits::rebind_alloc can be used to form a valid allocator type."},
{"lineNum":"  179","line":"  template<typename _Tp>"},
{"lineNum":"  180","line":"    class allocator<const _Tp>"},
{"lineNum":"  181","line":"    {"},
{"lineNum":"  182","line":"    public:"},
{"lineNum":"  183","line":"      typedef _Tp value_type;"},
{"lineNum":"  184","line":"      template<typename _Up> allocator(const allocator<_Up>&) { }"},
{"lineNum":"  185","line":"    };"},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"  template<typename _Tp>"},
{"lineNum":"  188","line":"    class allocator<volatile _Tp>"},
{"lineNum":"  189","line":"    {"},
{"lineNum":"  190","line":"    public:"},
{"lineNum":"  191","line":"      typedef _Tp value_type;"},
{"lineNum":"  192","line":"      template<typename _Up> allocator(const allocator<_Up>&) { }"},
{"lineNum":"  193","line":"    };"},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"  template<typename _Tp>"},
{"lineNum":"  196","line":"    class allocator<const volatile _Tp>"},
{"lineNum":"  197","line":"    {"},
{"lineNum":"  198","line":"    public:"},
{"lineNum":"  199","line":"      typedef _Tp value_type;"},
{"lineNum":"  200","line":"      template<typename _Up> allocator(const allocator<_Up>&) { }"},
{"lineNum":"  201","line":"    };"},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"  /// @} group allocator"},
{"lineNum":"  204","line":""},
{"lineNum":"  205","line":"  // Inhibit implicit instantiations for required instantiations,"},
{"lineNum":"  206","line":"  // which are defined via explicit instantiations elsewhere."},
{"lineNum":"  207","line":"#if _GLIBCXX_EXTERN_TEMPLATE"},
{"lineNum":"  208","line":"  extern template class allocator<char>;"},
{"lineNum":"  209","line":"  extern template class allocator<wchar_t>;"},
{"lineNum":"  210","line":"#endif"},
{"lineNum":"  211","line":""},
{"lineNum":"  212","line":"  // Undefine."},
{"lineNum":"  213","line":"#undef __allocator_base"},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"  // To implement Option 3 of DR 431."},
{"lineNum":"  216","line":"  template<typename _Alloc, bool = __is_empty(_Alloc)>"},
{"lineNum":"  217","line":"    struct __alloc_swap"},
{"lineNum":"  218","line":"    { static void _S_do_it(_Alloc&, _Alloc&) _GLIBCXX_NOEXCEPT { } };"},
{"lineNum":"  219","line":""},
{"lineNum":"  220","line":"  template<typename _Alloc>"},
{"lineNum":"  221","line":"    struct __alloc_swap<_Alloc, false>"},
{"lineNum":"  222","line":"    {"},
{"lineNum":"  223","line":"      static void"},
{"lineNum":"  224","line":"      _S_do_it(_Alloc& __one, _Alloc& __two) _GLIBCXX_NOEXCEPT"},
{"lineNum":"  225","line":"      {"},
{"lineNum":"  226","line":"\t// Precondition: swappable allocators."},
{"lineNum":"  227","line":"\tif (__one != __two)"},
{"lineNum":"  228","line":"\t  swap(__one, __two);"},
{"lineNum":"  229","line":"      }"},
{"lineNum":"  230","line":"    };"},
{"lineNum":"  231","line":""},
{"lineNum":"  232","line":"  // Optimize for stateless allocators."},
{"lineNum":"  233","line":"  template<typename _Alloc, bool = __is_empty(_Alloc)>"},
{"lineNum":"  234","line":"    struct __alloc_neq"},
{"lineNum":"  235","line":"    {"},
{"lineNum":"  236","line":"      static bool"},
{"lineNum":"  237","line":"      _S_do_it(const _Alloc&, const _Alloc&)"},
{"lineNum":"  238","line":"      { return false; }"},
{"lineNum":"  239","line":"    };"},
{"lineNum":"  240","line":""},
{"lineNum":"  241","line":"  template<typename _Alloc>"},
{"lineNum":"  242","line":"    struct __alloc_neq<_Alloc, false>"},
{"lineNum":"  243","line":"    {"},
{"lineNum":"  244","line":"      static bool"},
{"lineNum":"  245","line":"      _S_do_it(const _Alloc& __one, const _Alloc& __two)"},
{"lineNum":"  246","line":"      { return __one != __two; }"},
{"lineNum":"  247","line":"    };"},
{"lineNum":"  248","line":""},
{"lineNum":"  249","line":"#if __cplusplus >= 201103L"},
{"lineNum":"  250","line":"  template<typename _Tp, bool"},
{"lineNum":"  251","line":"    = __or_<is_copy_constructible<typename _Tp::value_type>,"},
{"lineNum":"  252","line":"            is_nothrow_move_constructible<typename _Tp::value_type>>::value>"},
{"lineNum":"  253","line":"    struct __shrink_to_fit_aux"},
{"lineNum":"  254","line":"    { static bool _S_do_it(_Tp&) noexcept { return false; } };"},
{"lineNum":"  255","line":""},
{"lineNum":"  256","line":"  template<typename _Tp>"},
{"lineNum":"  257","line":"    struct __shrink_to_fit_aux<_Tp, true>"},
{"lineNum":"  258","line":"    {"},
{"lineNum":"  259","line":"      static bool"},
{"lineNum":"  260","line":"      _S_do_it(_Tp& __c) noexcept","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  261","line":"      {"},
{"lineNum":"  262","line":"#if __cpp_exceptions"},
{"lineNum":"  263","line":"\ttry"},
{"lineNum":"  264","line":"\t  {"},
{"lineNum":"  265","line":"\t    _Tp(__make_move_if_noexcept_iterator(__c.begin()),","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  266","line":"\t\t__make_move_if_noexcept_iterator(__c.end()),"},
{"lineNum":"  267","line":"\t\t__c.get_allocator()).swap(__c);"},
{"lineNum":"  268","line":"\t    return true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  269","line":"\t  }"},
{"lineNum":"  270","line":"\tcatch(...)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  271","line":"\t  { return false; }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  272","line":"#else"},
{"lineNum":"  273","line":"\treturn false;"},
{"lineNum":"  274","line":"#endif"},
{"lineNum":"  275","line":"      }","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  276","line":"    };"},
{"lineNum":"  277","line":"#endif"},
{"lineNum":"  278","line":""},
{"lineNum":"  279","line":"_GLIBCXX_END_NAMESPACE_VERSION"},
{"lineNum":"  280","line":"} // namespace std"},
{"lineNum":"  281","line":""},
{"lineNum":"  282","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bech32_fuzz_2_gcc_instrumented", "date" : "2023-07-28 14:53:55", "instrumented" : 10, "covered" : 0,};
var merged_data = [];
