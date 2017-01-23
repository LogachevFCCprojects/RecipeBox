import React from 'react';
import ReactDOM from 'react-dom';

class EditorSingleIngredient extends React.Component {
    	static defaultProps = {
            possibleMeasures: ['g', 'ml', 'pcs']
        };
        state = this.props;
        componentDidMount() {
            this.updateInputElements(this);
        }
        componentDidUpdate() {
            this.updateInputElements(this);
        }
        updateInputElements() {
            ReactDOM.findDOMNode(this.refs.name).value = this.state.name;
            ReactDOM.findDOMNode(this.refs.amount).value = this.state.amount;
        }
        isIngredientValid(obj) {
        	console.info('проверяем ингредиент',obj);
            let result = true;
            if (obj.name === '' || obj.name === ' ' || obj.name === undefined) result = false;
            obj.amount = obj.amount.replace(/[^\d]/g, '').replace(/^0*/g, '');  //иногда вылетает is not a function
            if (obj.amount === '') result = false;
            if (this.state.possibleMeasures.indexOf(obj.measure) === -1) result = false;
            return result;
        }
        submitFieldValue(fieldName, fieldValue) {
            // prepare an object before changes // looks like anti-pattern...
            let nextObj = {
                id: this.state.id,
                name: this.state.name,
                amount: this.state.amount,
                measure: this.state.measure,
            };

            // actually we update field Value here
            nextObj[fieldName]=fieldValue; 
			
            // CHANGE State anyway
            this.setState({[fieldName]: fieldValue});

            //why look for an object if we can lookup state?
            //if (this.isIngredientValid(nextObj)) {
            	window.ee.emit('Ingredient.update', nextObj);
            //}
        }

        onNameChange = (e) => {            
        	this.submitFieldValue('name', e.currentTarget.value);
        }

        onAmountChange = (e) => {            
        	this.submitFieldValue('amount', e.currentTarget.value);
        }

        onMeasureChange = (e) => {   
        	this.submitFieldValue('measure', e.currentTarget.value);
        }

        onRemoveClick = (id, e) => {
            e.preventDefault();
            window.ee.emit('Ingredient.remove', id);
        }

        render() {
            let {id, measure, possibleMeasures} = this.state;
            console.group(this.props.id);
            console.log(this.props);
            console.log(this.props.id, this.state.id);
            console.log(this.props.name, this.state.name);
            console.log(this.props.amount, this.state.amount);
            console.log(this.props.measure, this.state.measure);
            console.groupEnd();
            let measuresTemplate = possibleMeasures.map((item) => {
            	return(
            		<label className="inline-radio">
	            		<input type="checkbox" 
	            			name="measure" 
	            			value={item} 
	            			checked={measure === item} 
		                    onChange={this.onMeasureChange} 
		                    />
		                <span><em>{item}</em></span>
            		</label>
            		);
            });
            return (
                <tr className="ingredient">
                    <td className="ingredient__name" >
                        <input type='text' 
                        	   onChange={this.onNameChange}
                        	   placeholder='Ingredient name' 
                        	   ref='name'/>
                    </td>
                    <td className="ingredient__amount" >
                        <input type='text' 
                               onChange={this.onAmountChange} 
                               placeholder='amount' 
                               ref='amount'/>
                    </td>
                    <td className="ingredient__measure" >
	                    <fieldset>
	                    	{measuresTemplate}
	                    </fieldset>
                        <button onClick={this.onRemoveClick.bind(this,id)} className="grey">X</button>
                    </td>
                </tr>
                )
        }
    }

export default EditorSingleIngredient;