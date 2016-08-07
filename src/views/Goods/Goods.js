import React, { PropTypes } from 'react'
import Uxcore,{Form,Button,Table} from 'uxcore'
import {
  connect
} from 'react-redux'
import {
  Link
} from 'react-router'

import Infinite from 'react-infinite'
import { getGoods ,resetGoods} from 'actions/'

import 'uxcore/assets/iconfont.css';
import 'uxcore/assets/blue.css';

const {
    Constants,
    FormRowTitle,
    FormRow,
    FormField,
    InputFormField,
    Validators,
    RadioGroupFormField,
    SelectFormField,
    TextAreaFormField,
    NumberInputFormField,
    DateFormField,
    CheckboxGroupFormField,
    CascadeSelectFormField,
    OtherFormField,
    ButtonGroupFormField,
    EditorFormField,
    SwitchFormField,
} =  Form

class Goods extends React.Component {

  static propTypes = {
    children : React.PropTypes.element
  }
  state ={
    isInfiniteLoading: false,
    elements: [],
    //查询条件
    jsxvalues:{
      onSale : '',
      id:'',
      name:'',
      onsaleDate:''
    }
  }

  componentWillMount() {
    getGoods()
  }

  handleClick() {
      let me = this;
      console.log(JSON.stringify(me.refs.form.getValues(true)));
  }


  render (){
    let me = this;
    let columns = [
            { dataKey: 'id', title: '商品ID', width: 150, fixed: true},
            { dataKey: 'name', title:'商品标题', width: 200, fixed: true},
            { dataKey: 'markPrice',  title:"市场价格", width: 150, fixed: true},
            { dataKey: 'lowestPrice',  title:"抢购价格", width: 150, fixed: true},
            { dataKey: 'onsale',  title:"状态", width: 100, fixed: true},
            { dataKey: 'label',  title:"标签", width: 200, fixed: true},
            { dataKey: 'action1', title: '操作1', width:200, type:"action", actions: [
                    {
                        title: '编辑',
                        callback: (rowData) => {
                            me.refs.grid.editRow(rowData);
                        },
                        mode: Constants.MODE.VIEW
                    },

                    {
                        title: '删除',
                        callback: (rowData) => {
                            me.refs.grid.delRow(rowData);
                        },
                        // mode: Constants.MODE.VIEW
                    }
                ]
            }
        ];
    let renderProps={
            // height: 200,
            width: '100%',
            showPager:false,
            fetchParams: {},
            showHeaderBorder: true,
            getSavedData: true,
            jsxdata: me.state.data,
            doubleClickToEdit: true,

            // fetchUrl:"http://demo.nwux.taobao.net/file/getGridJson.jsonp",
            // fetchUrl: "http://10.1.159.52:3002/demo/data.json",
            jsxcolumns:columns,
            beforeFetch: (sendData) => {sendData.id = 1; return sendData;},
            processData: (data) => {return data;},
            onChange: me.handleTableChange
        };
    return (
      <div>
      <div className="panel-heading">
          商品管理
      </div>
      <div className="panel-body">
          <div className="tab-content">
            <div className="tab-pane fade active in" id="home">
              <div className="upload-link" style= { { width: '100%' } }>
                <Form ref="form" instantValidate={true} jsxmode={Constants.MODE.EDIT} jsxvalues={me.state.jsxvalues}>
                  <FormRow>
                        <SelectFormField
                         jsxlabel="上架状态"
                         jsxname="onSale"
                         allowClear={true}
                         jsxdata={ {"1":"已上架","0":"未上架","2":"全部" }}
                        />

                        <InputFormField
                               labelMatchInputHeight
                               jsxname="id"
                               autoTrim={true}
                               jsxlabel="商品ID"
                               validateOnBlur={false}>
                        </InputFormField>
                    </FormRow>
                    <FormRow>
                        <InputFormField
                         labelMatchInputHeight
                         jsxname="name"
                         autoTrim={false}
                         jsxlabel="商品名称"
                         validateOnBlur={false}>
                        </InputFormField>
                        <DateFormField format="yyyy-MM-dd" jsxname="onsaleDate" jsxlabel="上架时间" jsxtype="single" locale="zh-cn" />

                    </FormRow>
                    <FormRow>
                        <SelectFormField
                         jsxlabel="标签"
                         jsxname="labels"
                         allowClear={true}
                         disabled={false}
                         jsxdata={{'blue':'蓝色','white':'白色'}}/>

                         <ButtonGroupFormField>
                           <Button size="medium" onClick={me.handleClick.bind(me)}>筛选</Button>

                           <Link to="good" >新建商品</Link>


                       </ButtonGroupFormField>
                    </FormRow>
                </Form>
              </div>
              <div>
                <Table {...renderProps}  ref="grid"/>

              </div>
            </div>
          </div>
      </div>
      </div>
    );
  }
}
export default Goods;
