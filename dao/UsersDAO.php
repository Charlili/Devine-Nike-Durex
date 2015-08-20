<?php
			
require_once __DIR__ . "/DAO.php";

class UsersDAO extends DAO{

	public function selectAll(){
		$sql = "SELECT * 
				FROM `COLLAB_users`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	

	public function selectById($id){
		$sql = "SELECT * 
				FROM `COLLAB_users`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id",$id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByEmail($email){
		$sql = "SELECT * 
				FROM `COLLAB_users`
				WHERE `email` = :email";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":email",$email);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function addScore($id,$score){
		$post = $this->selectById($id);
		$sql = "UPDATE  `COLLAB_users` 
				SET  `score` =  :score  
				WHERE  `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id",$id);
		$stmt->bindValue(":score",$score);
		return $stmt->execute();
	}

	public function delete($id){
		$sql = "DELETE 
				FROM `COLLAB_users`
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(":id", $id);
		return $stmt->execute();
	}

	public function insert($data){
		$errors = $this->getValidationErrors($data);
		if(empty($errors)){
			$sql = "INSERT INTO `COLLAB_users` (`naam`, `email`, `adres`, `postcode`, `land`) 
					VALUES (:naam, :email, :adres, :postcode, :land)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':naam', $data["naam"]);
			$stmt->bindValue(':email', $data["email"]);
			$stmt->bindValue(':adres', $data["adres"]);
			$stmt->bindValue(':postcode', $data["postcode"]);
			$stmt->bindValue(':land', $data["land"]);
			if($stmt->execute()){
				$lastInsertId = $this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}
		}
		return false;
	}

	public function getValidationErrors($data){
		$errors = array();
	
		if(empty($data['email'])){
			$errors['email']='Vul jouw email in aub.';
		}else{
			if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
				$errors['email']='Vul een echte email adres in aub.';	
			}
			$user = $this->selectByEmail($data['email']);
			if($user){
				$errors['email'] = 'Deze email adres is al in gebruik.';
			}
		}
		
		if(empty($data['naam'])){
			$errors['naam']='Vul jouw naam in aub.';
		}else{
			$words = explode(' ',$data['naam']);
			//var_dump(sizeof($words));
			if(sizeof($words) < 2){
				$errors['naam']='Vul een voornaam en achternaam in aub.';
			}
			if(preg_match("/[0-9]/",$data['naam'])){
				$errors['naam']='Vul een voornaam en achternaam in met alleen letters aub.';
			}
		}
		if(empty($data['adres'])){
			$errors['adres']='Vul jouw adres in aub.';
		}else{
			$words = explode(' ',$data['adres']);
			if(sizeof($words) < 2){
				$errors['adres']='Vul een straat en huisnummer in aub.';
			} 
		}
		if(empty($data['postcode'])){
			$errors['postcode']='Vul jouw postcode in aub.';
		}else{
			if(!preg_match("/^[0-9]{4}$/",$data['postcode'])){
				$errors['postcode']='Vul in een postcode van 4 nummers.';
			}
		}
		if(empty($data['land'])){
			$errors['land']='Vul jouw land in aub.';
		}
		return $errors;

	}

}