import React, { memo } from 'react'

const Childmemo = (props) => {	
		
	return (
		<div className="child">
			{console.log('HooksChild_memo---render')}
			<h3>我是Child组件</h3>
			<span>我接到的车是：{props.childCarName}</span>
		</div>
	)
}

/*
const areEqual = (prevProps, nextProps) => {
	
	if(prevProps.props === nextProps.props){
		return true
	}else{
		return false
	}
		 
}
*/

export default Childmemo
//export default memo(Childmemo)
//export default memo(Childmemo, areEqual)
