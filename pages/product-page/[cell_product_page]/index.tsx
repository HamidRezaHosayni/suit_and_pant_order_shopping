import * as product_dropdown from "@/public/js/product_page_dropdown"
import Sider_cell_product_page from "@/public/component/product_page/slider_cell_product_page"
import React, { useEffect, useRef, useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { HiPlusSm } from 'react-icons/hi'
import { IoIosArrowDown } from "react-icons/io";
import { MdAddShoppingCart, MdMinimize } from 'react-icons/md'
import { FaCommentMedical, FaHeart } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import { BiSolidErrorAlt } from "react-icons/bi"
import { FaCheckCircle, FaRegUser } from "react-icons/fa"
import { show_popup_Element } from "@/public/js/popup_elment_form"
import { introduce_save_product_heart } from "@/public/js/introduce_save_product_heart"
import Introduce_product from "@/public/redux/introduse_product_heart"


function Cell_product_page() {
  const [heart_introduce_product, set_heart_introduce_product] = useState(0)
  const [information_product, set_information_product] = useState<any>([])
  const [select_size, set_select_size] = useState<any>()

  const [message_popup_notif, set_message_popup_notif] = useState({ "Message_type": "", "message": "" })
  const [Redirect_Logni, set_Redirect_Logni] = useState(null)
  const [comment_user_product, set_comment_user_product] = useState<any>();
  const state_product = useSelector((state: any) => state.Introduce_product.Introduce_product)
  const dispatch = useDispatch();
  const popup_element = useRef(null)

  const introduce_product = useRef<any>()

  const introduce_heart_product = (value: any) => {
    const mm = introduce_save_product_heart(introduce_product, value);
    dispatch(Introduce_product.actions.Introduce_product(mm))
  }


  const show_and_hidden_popup = () => {
    show_popup_Element(popup_element, Redirect_Logni);
  }

  // heart prosuct  
  const [heartchange, setheartchange] = useState(false)

  // dorpdown function 
  const dropdownproductpage = useRef(null);
  const drop_prosuct_cell = () => {
    product_dropdown.dropdown(dropdownproductpage);
  }

  // open comment product 
  const opencomment = useRef(null)
  const open_comment = () => {
    product_dropdown.open_comment(opencomment)
  }
  const close_comment = () => {
    product_dropdown.close_comment(opencomment)
  }

  const is_Login = useSelector((state: any) => state.is_Login.is_Login)

  const path_route = useRouter()
  const id_product = path_route.query.cell_product_page;


  useEffect(() => {
    console.log("ok")
    const token = window.localStorage.getItem("Token_validation");
    if (token) {
      axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/information_product`, { id_product }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        }
      })
        .then((value1) => {
          set_comment_user_product(value1.data.comment_product)
          set_information_product(value1.data.value[0])
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [set_information_product,id_product])


  const add_shpping_product = () => {
    if (window.localStorage.getItem("shopping_westbasket")) {

      const add_All_product_westbasket = { ...information_product, select_size }
      if (add_All_product_westbasket.select_size === undefined) {
        set_message_popup_notif({ "Message_type": "error", "message": "لطفا سایز محصول را انتخاب کنید" })
        show_and_hidden_popup()
      }
      else {
        const All_product_westbasket = JSON.parse(window.localStorage.getItem("shopping_westbasket")!)
        const All_product_new_and_old_westbasket = [...All_product_westbasket, information_product]
        window.localStorage.setItem("shopping_westbasket", JSON.stringify(All_product_new_and_old_westbasket))
        set_message_popup_notif({ "Message_type": "successfully", "message": "محصول به سبد خرید اضافه شد ." })
        show_and_hidden_popup()
      }

    }
    else {

      const add_All_product_westbasket = { ...information_product, select_size }
      if (add_All_product_westbasket.select_size === undefined) {
        set_message_popup_notif({ "Message_type": "error", "message": "لطفا سایز محصول را انتخاب کنید" })
        show_and_hidden_popup()
      }
      else {

        window.localStorage.setItem("shopping_westbasket", JSON.stringify([add_All_product_westbasket]))
        set_message_popup_notif({ "Message_type": "successfully", "message": "محصول به سبد خرید اضافه شد ." })
        show_and_hidden_popup()
      }

    }

  }
  const heart_product = (value: any) => {
    const All_introduce_product = JSON.parse(window.localStorage.getItem("introduse_product")!)
    const mm = All_introduce_product.includes(value)
    return mm;
  }

  const comment_product = useRef<any>(null)
  const send_comment = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/route_commend_product`, { "id_product": information_product.id, "message_value": comment_product.current?.value }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": window.localStorage.getItem("Token_validation")
      }
    })
      .then((value1) => {
        const data_response = value1.data;
        set_message_popup_notif(data_response)
        show_and_hidden_popup()
      })
      .catch((e) => {
        console.log(e)
      })
  }


  return (
    <>
      <div className="container m-auto w-full top-[20rem] flex justify-center items-center absolute  z-[100]">
        {/* popup in response value  */}
        <div ref={popup_element} className='lg:w-[0rem] w-[0rem] h-[0rem] relative rounded-xl overflow-hidden bg-[--them1] border transition-all duration-300 ease-in-out'>
          <div className='w-full h-[2rem] text-[3rem] text-white mt-[3rem] flex justify-center items-center flex-row'>
            {message_popup_notif.Message_type === "error" ? <BiSolidErrorAlt /> : <FaCheckCircle />}
          </div>
          <div className='w-full h-[2rem] text-[2rem] text-white mt-[3rem] flex justify-center items-center flex-row'>
            <p className='lg:text-[1rem] text-[0.8rem] font-v-medium'>{message_popup_notif.message}</p>
          </div>
          <div onClick={show_and_hidden_popup} className='w-full h-[2rem] cursor-pointer border text-white hover:text-[--them4] hover:bg-[--them2] flex justify-center items-center mt-[3rem] font-v-medium text-[1rem]'>
            <button className='boeder-2 border-white'>باشه</button>
          </div>
        </div>
      </div>


      {is_Login ?
        <div className="relative">

          <div className='container mr-auto ml-auto mb-auto mt-[2rem] flex justify-center items-start flex-col-reverse lg:flex-row'>

            {/* text product and cell product  */}
            <div className="lg:w-[40%] w-full leading-10 flex justify-center items-center flex-col px-[1rem] mt-[1rem] lg:mt-[unset]">
              {/* heart icon  */}
              <div className="w-full flex justify-end items-center mt-[1rem]">

                <div className="w-[2rem] h-[2rem] cursor-pointer lg:ml-[5rem] flex justify-center items-center rounded-md">

                  <div className="flex justify-end items-center flex-row">
                    <span>
                      {state_product?.includes(information_product.id) || heart_product(information_product.id) ? <span ref={introduce_product} onClick={() => { introduce_heart_product(information_product.id) }}><FaHeart className='lg:text-[1.5rem] text-[1rem] text-red-600 cursor-pointer' /></span> : <span ref={introduce_product} onClick={() => { introduce_heart_product(information_product.id) }}><CiHeart className='lg:text-[1.5rem] text-[1rem] cursor-pointer text-black' /></span>}
                    </span>
                  </div>


                </div>

              </div>

              <div>
                {/* name product  */}
                <div className="mt-[1rem]">
                  <span className="lg:text-[1rem] text-[0.8rem] font-v-medium">نام محصول : </span>
                  <span className="lg:text-[1rem] text-[0.8rem] font-v-light">{information_product.name_product}</span>
                </div>
                {/* cell product  */}

                <div>
                  <span className="lg:text-[1rem] text-[0.8rem] font-v-medium">قیمت محصول : </span>
                  <span className="lg:text-[1rem] text-[0.8rem] font-v-light">{information_product.price_product}</span>
                </div>

                {/* count priduct  */}
                <div className='flex justify-start items-center flex-row'>
                  <span className="lg:text-[1rem] text-[0.8rem] font-v-medium" > نوع پارچه : </span>
                  <span className='rounded-lg flex justify-center items-center'>{information_product.fabric_material}</span>
                </div>

                <div>
                  <span className="lg:text-[1rem] text-[0.8rem] font-v-medium" >رنگ محصول: </span>
                  <span className="lg:text-[1rem] text-[0.8rem] font-v-light">{information_product.color_suit}</span>
                </div>

                <div>
                  <label htmlFor="size" className="lg:text-[1rem] text-[0.8rem] font-v-medium">سایز محصول : </label>

                  <select name="size" onChange={(e) => set_select_size(e.target.value)} className="border w-[10rem] rounded-lg bg-[--them3]" id="cars">
                    <option value="">انتخاب سایز</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                  </select>
                </div>

                {/* boutton coustom product and shopping product  */}
                <div className='flex justify-start items-center flex-row mt-[3rem]'>
                  <Link href={"/select-unit-suit"} className='lg:text-[1rem] text-[0.8rem] cursor-pointer px-[0.9rem] bg-[--them4] text-[--them2] hover:bg-[--them2] hover:text-[--them4] rounded-lg transition-all duration-300 ease-in-out'>شخصی سفارش دهید</Link>
                  <button onClick={add_shpping_product} className='cursor-pointer px-[0.9rem] bg-[--them4] text-[--them2] hover:bg-[--them2] hover:text-[--them4] rounded-lg transition-all duration-300 ease-in-out flex justify-center items-center flex-row mr-[1rem]'>
                    <span className="lg:text-[1rem] text-[0.8rem] ">افزودن به سبد خرید</span>
                    <span className='mr-[1rem]'><MdAddShoppingCart /></span>
                  </button>
                </div>

                {/* drop down element  */}
                <div>

                  <div ref={dropdownproductpage} onClick={drop_prosuct_cell} className='transition-all duration-300 ease-in-out whitespace-pre-wrap rounded-lg bg-[--them3] h-[4vh] overflow-hidden w-full px-[1rem] flex justify-start items-center flex-col mt-[20px]'>

                    <div className='w-full h-[4vh] flex justify-between items-center flex-row'>
                      <h2 className='text-right w-full text-[--them4] text-[15px] font-v-bold'>توضیحات محصول</h2>
                      <span className=''><IoIosArrowDown /></span>
                    </div>

                    <p className='w-full text-start leading-5 lg:leading-8 mt-3 font-v-light text-[15px] text-[--them4]'>{information_product.discription_product}</p>

                  </div>

                </div>
              </div>
            </div>

            {/* pic_product cell page  */}
            <div className="lg:w-[50%] w-full flex justify-start items-center">
              <Sider_cell_product_page picthure_product={information_product.uploadfile?.split(",")} />
            </div>


          </div>


          {/* comment product  */}
          <div className="container mr-auto ml-auto mb-auto mt-[5rem] relative">

            {/* boutton product  */}
            <div onClick={open_comment} className="lg:w-[9rem] lg:h-[3rem] h-[2rem] flex justify-center items-center flex-row lg:text-[1rem] text-[0.8rem] cursor-pointer px-[0.9rem] bg-[--them4] text-[--them2] hover:bg-[--them2] hover:text-[--them4] rounded-lg transition-all duration-300 ease-in-out">
              <button className="ml-[1rem]">ارسال نظر</button>
              <FaCommentMedical />
            </div>

            {/* list comment product  */}
            <div className="lg:mt-[10rem] mt-[2rem]">
              <ul>
                {
                  comment_user_product?.map((value: any,index:any) => {
                    return(
                      <li key={index} className="lg:text-[1rem] text-[0.8rem] font-v-light p-2 flex justify-start items-center flex-row">
                        <span className="w-[2rem] h-[2rem] rounded-2xl bg-[--them3] ml-[0.4rem] border flex justify-center items-center"><FaRegUser /></span>
                        <span className=" bg-[--them3] p-2 rounded-lg">{value.message}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            {/* open comment  */}
            <div ref={opencomment} className="flex justify-start items-cente flex-col lg:w-[0rem] w-[0rem] lg:h-[0rem] h-[0rem] bg-[--them3] rounded-lg absolute bottom-0 lg:right-[10rem] right-0 z-[99] overflow-hidden transition-all duration-300 ease-in-out">

              <div className="flex justify-end items-center flex-row">
                <span onClick={close_comment} className="mt-1 ml-1"><IoClose className="text-[1.5rem] cursor-pointer left-0" /></span>
              </div>

              <textarea ref={comment_product} className="mt-[1rem] mx-[1rem] " name="comment_options" id=""></textarea>
              <div onClick={send_comment} className="flex justify-center items-center flex-row mt-[2rem]">
                <div className="lg:w-[9rem] lg:h-[3rem] h-[2rem] flex justify-center items-center flex-row lg:text-[1rem] text-[0.8rem] cursor-pointer px-[0.9rem] bg-[--them4] text-[--them2] hover:bg-[--them2] hover:text-[--them4] rounded-lg transition-all duration-300 ease-in-out">
                  <button className="ml-[1rem]">ثبت نظر</button>
                  <FaCommentMedical />
                </div>
              </div>

            </div>


          </div>

        </div>
        :
        <div className='container m-auto w-full flex justify-center items-center flex-col min-h-[10rem]'>
          <h1 className='lg:text-[1rem] text-[0.8rem] font-v-light'>برای دیدن این صفحه ابتدا باید وارد شوید</h1>
          <h1 className='lg:text-[1rem] text-[0.8rem] font-v-light'>برای ورورد <Link className='text-blue-600 font-v-bold mx-1' href={"/Login-user"}>اینجا</Link> کلیک کنید</h1>
        </div>
      }
    </>
  )
}

export default Cell_product_page