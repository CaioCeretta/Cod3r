/**
 * Pure function
 *
 * A pure functions receive parameters and its output is dependent only and exclusively to this parameters its is receiving
 *
 * It does not change anything, it simply receive the parameters, do some processing and returns something
 *
 */

function soma(a, b) {
	return a + b;
}

/**
 * Impure function
 *
 * Since this function alters variables outside of its scope, it becomes an impure function
 *
 * its result, even though it depend on the parameters, we are altering something outside of it.
 *
 * Fetching data from an external place, such as an API, it potentially makes our function impure, because we are getting
 * a data that comes from an external source which does not come from our app.
 */

let resultado;

function soma2(a, b) {
	resultado = a + b;
	return resultado;
}

/**
 *  Collateral Effect:
 *
 *  They are the effects that happen in an impure function, and this assignment to change the global variable, is one of
 *  them.
 *  When we think on collateral effects, we think of something that will happen and is out of our control, such as the
 *  medicines ones, we do not expect the ones specified in the leaflet to happen with us.
 *  Even though it may happen, we do not expect all of them to happen.
 *
 *  In our code, we specified the resultado variable, and we determine that its value is going to change since if is
 *  declared with let. And if we explicitly determined it, why is it a collateral effect?
 *
 *  What we need to understand is that the computational collateral effect is not the exact definition we are used to.
 *  The collateral effect here is related to something that MAY happen in an undesired way, which can result in some
 *  problem.
 *
 *  As an example in this impure function, if we call the soma2() function with the values 1, 5 and in other part of our
 *  program we call this with the 0, 8 values. Our `resultado` variable will have its value changed, and depending on the
 *  part of the code where we need to use this result variable, the fact that we may not know its true value, it can be
 *  an issue and bring undesired effects with it. Therefore, we can think that a collateral effect is a possibility of
 *  errors.
 *
 *  We won't be able to have an app using 100% pure functions, but it is interesting for us to know about them, and
 *  when to use them
 *
 *  In React, we consider as collateral effects, everything that is not related to the program rendering and everything
 *  that is not related to user inputs. So if it is not related to user inputs or to components renderings, inside react
 *  we will treat is as one.
 */
