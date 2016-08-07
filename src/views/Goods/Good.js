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

class Good extends React.Component {

  render(){
    let me = this

    return(
      <div>

      </div>
    )

  }
}
export default Good;
