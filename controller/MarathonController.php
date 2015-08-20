<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
//gebruikte DAOs aanroepen
require_once WWW_ROOT . 'dao' . DS . 'UsersDAO.php';
class MarathonController extends Controller {
	//DAOs aanmaken
	private $usersDAO;

	function __construct() {
		$this->usersDAO = new UsersDAO();

	}
	public function index(){

		if(!empty($_SESSION['email'])){
			$this->set('email',$_SESSION['email']);	
		}
		if(!empty($_SESSION['score'])){
			$this->set('score',$_SESSION['score']);	
		}
		if(!empty($_POST)){
			$this->inschrijven();
		}
		
	}
	private function inschrijven(){
		
		if(!empty($_POST)){
			
			//add to database
			$newUser = array(
				"naam"=>$_POST['naam'],
				"email"=>$_POST['email'],
				"postcode"=>$_POST['postcode'],
				"adres"=>$_POST['adres'],
				"land"=>$_POST['land'],
			);


			$added = $this->usersDAO->insert($newUser);
			$errors = array();
			//var_dump($added);
			if(!$added){
				$errors = $this->usersDAO->getValidationErrors($newUser);
				$_SESSION['error'] = "Het registreren is niet gelukt.";
			}else{
				$_SESSION['info'] = "Registratie voltooid! Zin om al te oefenen?";
				$_SESSION['email'] = $_POST['email'];
				$this->redirect('#spelen');
			}
			$this->set('errors',$errors);
			$_SESSION['error'] = 'Het registreren is niet gelukt.';
			//$this->redirect('#praktisch');

		}
	}
	public function highscore(){
		if(!empty($_POST)){
			$errors = array();

			if(empty($_POST['email'])){
				$errors['email']='Vul jouw email in aub.';
			}else{
				$user = $this->usersDAO->selectByEmail($_POST['email']);
				if(!$user){
					$errors['email'] = 'Deze e-mail adres is niet geregistreerd';
				}
			}
			$score = 0;
			// if(empty($_POST['score'])){
			// 	if()
			// }else{
			// 	$user = $this->usersDAO->selectByscore($_POST['score']);
			// 	if(!$user){
			// 		$errors['score'] = 'Deze e-mail adres is niet geregistreerd';
			// 	}
			// }
		}
		
	}

	/* //voorbeeld functie
	public function index() {
		//if empty $_GET['id'], empty[$_POST], empty($post['id']), empty($_SESSION["user"]), empty($errors), 

		$this->set('posts', $this->postDAO->selectTopPosts());
		//$this->redirect("index.php?page=detail&id={$_GET["id"]}");
		//$this->set('errors',$errors);

			}
	*/


	/* //voorbeeld private functie dat wordt aangeroepen in de class zelf
	private function handleCommentPost($newsitem) {
	}
*/

}