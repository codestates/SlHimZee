// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

interface ERC20Interface {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    //transfer 이벤트는 토큰이 이동할때 마다 로그를 남김.
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address spender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Transfer(address indexed spender, address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 oldAmount, uint256 amount);
    //approval은 approve 함수가 실행 될 때 로그를 남긴다.
    //객체의 키는 OWNER의 address(주소값)이며, 값은 토큰을 양도받은 SPENDER에 대한 객체입니다.
    //KEY : OWNER의 address
    //VALUE : ( KEY : SPENDER의 address , VALUE : 맡겨둔 TOKEN의 개수 )

    //ex) 
    //function (<parameter types>) {internal | external | public | private} [pure | constant | view | payable] [(modifiers)] [returns (<return types>)]
    // visibillity keyword (internal, external, public, privat) : 접근제어자 역할

    //internal : 계약서의 해당 내용을 비공개한다. 계약서 내부에서만 사용하는 함수, 상태변수는 기본적으로 internal이기 때문에 아무것도 적용하지 않을 시 자동적으로 internal
    //external : 계약서의 해당 내용을 공개한다. 계약서 외부에서 사용하는 함수, 상태변수는 external일 수 없다. 계약서 내부에서 사용할 시 this 를 사용해서 접근해야함.
    //public : 공개 함수, 내부적으로 or 메세지를 통해 호출 가능, 공개 상태 변수 일 경우 getter 함수가 생성
    //private : 비공개함수, 계약서 내부에서도 자시만 사용하는 함수, 상태변수와 함수 모두 파생된 계약이 아닌 정의된 계약에서만 볼 수 있다.

    //함수 동작 관련 키워드//
    //pure : storage에서 변수를 읽어오거나 쓰지 않는 함수임을 명시
    //constant, view : 상태를 변경하지 않는 함수임을 명시
    //payable : 입금을 받을 수 있는 함수 명시
    
}

library SafeMath {
  	function mul(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a * b;
		assert(a == 0 || c / a == b);
		return c;
  	}

  	function div(uint256 a, uint256 b) internal pure returns (uint256) {
	    uint256 c = a / b;
		return c;
  	}

  	function sub(uint256 a, uint256 b) internal pure returns (uint256) {
		assert(b <= a);
		return a - b;
  	}

  	function add(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a + b;
		assert(c >= a);
		return c;
	}
    //internal은 함수가 컨트랙트 내부에서만 사용될 수 있도록 제한할 때 사용합니다.
    //pure 는 함수가 상태 변수를 읽거나 쓰지 않을 때 사용합니다. SafeMath 라이브러리의 함수에서는 단순 연산의 결과값을 반환하기 때문에 상태 변수를 읽거나 쓰지 않습니다.
    //require 대신 assert를 사용
    //assert는 false를 리턴하지만 계약을 실행 시키기 전에 확인을 할 수 없고, require는 계약을 실행 시키기 전에 확인을 할 수 있는것으로 알 수 있습니다.
}

abstract contract OwnerHelper {
  	address private _owner;

  	event OwnershipTransferred(address indexed preOwner, address indexed nextOwner);

  	modifier onlyOwner {
		require(msg.sender == _owner, "OwnerHelper: caller is not owner");
		_;
  	}

  	constructor() {
            _owner = msg.sender;
  	}

       function owner() public view virtual returns (address) {
           return _owner;
       }

  	function transferOwnership(address newOwner) onlyOwner public {
            require(newOwner != _owner);
            require(newOwner != address(0x0));
            address preOwner = _owner;
    	    _owner = newOwner;
    	    emit OwnershipTransferred(preOwner, newOwner);
  	}
}

contract SimpleToken is ERC20Interface, OwnerHelper{
     using SafeMath for uint256;
    //SimpleToken 안에서 ERC20Interface에 선언된 함수와 이벤트를 사용 가능
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) public _allowances;
    //2중으로 매핑된 approvals 확인 
    uint256 public _totalSupply;
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    bool public _tokenLock;
    mapping (address => bool) public _personalTokenLock;

    
    //totalSupply : 해당 스마트 컨트랙트 기반 ERC20 토큰의 총 발행량 확인
    //balanceOf : owner가 가지고 있는 토큰의 보유량 확인
    //transfer : 토큰을 전송
    //approve : 토큰을 전송 가능 하도록 spender에게 양도할 토큰의 양을 설정
    //allowance : 오너가 스펜더에게 양도 설정한 토큰의 양을 확인
    //transferFrom : 스펜더가 거래 가능하도록 양도 받은 토큰을 전송 

    //ERC20에서는 토큰의 오너가 직접 토큰을 다른사람에게 전송 할 수도 있지만 토큰을 양도할 만큼 등록해두고
    //필요할 때 제 3자를 통해 토큰을 양도 할 수 있다.
    //직접 토큰을 다른 사람에게 전송할때는 transfer 함수를 사용하고
    //토큰을 등록하는 방식을 사용 하는 경우 approve, allowance, transferFrom 이용
    constructor(string memory getName, string memory getSymbol) {
        _name = getName;
        _symbol = getSymbol;
        _decimals = 18;
        _totalSupply = 100000000e18;
        _balances[msg.sender] = _totalSupply;
        _tokenLock = true;
    }
    
    function name() public view returns (string memory) {
        return _name;
    }
    
    function symbol() public view returns (string memory) {
        return _symbol;
    }
    
    function decimals() public view returns (uint8) {
        return _decimals;
    }
    
    function totalSupply() external view virtual override returns (uint256) {
        return _totalSupply;
        //totalSupply : 해당 스마트 컨트랙트 기반 ERC20 토큰의 총 발행량 확인
        //토큰의 총 발행량 반환
    }
    
    function balanceOf(address account) external view virtual override returns (uint256) {
        return _balances[account];
        //balanceOf : owner가 가지고 있는 토큰의 보유량 확인
        //매핑된 값인 _balanceOf 에서 입력한 address인 account가 가지고 있는 토큰의 수를 리턴한다.
    }
    
    function transfer(address recipient, uint amount) public virtual override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        emit Transfer(msg.sender, recipient, amount);
        return true;
         //transfer : 토큰을 전송
         //trnasfer 는 내부 함수인 _
    }
    
    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
        //allowance : 오너가 스펜더에게 양도 설정한 토큰의 양을 확인
        //오너와 exchange 값을 입력해서 몇개가 등록 되어 있는지 확인 할 수 있다.
    }
    
    function approve(address spender, uint amount) external virtual override returns (bool) {
        uint256 currentAllownace = _allowances[msg.sender][spender];
        require(currentAllownace >= amount, "ERC20: Transfer amount exceeds allowance");
        _approve(msg.sender, spender, currentAllownace, amount);
        return true;
        //approve : 토큰을 전송 가능 하도록 spender에게 양도할 토큰의 양을 설정
        //지갑의 주인이 토큰을 EXCHANGE에 자신이 가진 토큰의 수보다 적게 거래 가능하도록 맡길 수 있다.
    }
    
    function transferFrom(address sender, address recipient, uint256 amount) external virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        emit Transfer(msg.sender, sender, recipient, amount);
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance, currentAllowance - amount);
        return true;
         //transferFrom : 스펜더가 거래 가능하도록 양도 받은 토큰을 전송 
         //exchange가 buyer가 구매 신청 해높은 금액에 대해 오너가 맡겨둔 토큰을 판매한다.
         
    }
    
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(isTokenLock(sender, recipient) == false, "TokenLock: invalid token transfer");
        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        _balances[sender] = senderBalance - amount;
        _balances[recipient] += amount;
    }
    
    
    
    function isTokenLock(address from, address to) public view returns (bool lock) {
        lock = false;

        if(_tokenLock == true)
        {
             lock = true;
        }

        if(_personalTokenLock[from] == true || _personalTokenLock[to] == true) {
             lock = true;
        }
    }

    function removeTokenLock() onlyOwner public {
        require(_tokenLock == true);
        _tokenLock = false;
    }

    function removePersonalTokenLock(address _who) onlyOwner public {
        require(_personalTokenLock[_who] == true);
        _personalTokenLock[_who] = false;
    }


    function _approve(address owner, address spender, uint256 currentAmount, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        require(currentAmount == _allowances[owner][spender], "ERC20: invalid currentAmount");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, currentAmount, amount);
    }
}
    