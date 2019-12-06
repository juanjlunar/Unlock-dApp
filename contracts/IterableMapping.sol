pragma solidity >=0.4.0 <0.7.0;
import './SafeMath.sol';

library IterableMapping {
    struct file {
        mapping(uint => IndexValue) data;
        KeyFlag[] keys;
        uint size;
    }

    struct IndexValue {
        uint keyIndex;
        uint goal;
        string fileLink;
        string title;
        string description;
        address payable goalAddress;
        uint donated;
        uint dateCreated;
        bool isGoalReached;
    }
    struct KeyFlag { uint key; bool deleted; }

    function insert(
        file storage self,
        uint _goal,
        string memory _fileLink,
        string memory _title,
        string memory _description,
        address payable _goalAddress
    ) internal returns (uint) {
        if (self.size == 0) self.keys.length++;

        self.size++;
        self.data[self.size].goal = _goal;
        self.data[self.size].fileLink = _fileLink;
        self.data[self.size].title = _title;
        self.data[self.size].description = _description;
        self.data[self.size].goalAddress = _goalAddress;
        self.data[self.size].dateCreated = block.timestamp;

        self.keys.length++;
        self.data[self.size].keyIndex = self.size;
        self.keys[self.size].key = self.size;

        return self.data[self.size].keyIndex;
    }

    function donate(file storage self, uint _index, uint _value) internal returns(uint, bool) {
        self.data[_index].donated = SafeMath.add(self.data[_index].donated, _value);
        if (self.data[_index].donated >= self.data[_index].goal) {
            self.data[_index].isGoalReached = true;
        }
        return (self.data[_index].donated, self.data[_index].isGoalReached);
    }

    function resetDonated(file storage self, uint _index) internal returns(bool) {
        self.data[_index].donated = 0;
        return true;
    }

    function contains(file storage self, uint key) internal view returns (bool) {
        return self.data[key].keyIndex > 0;
    }

    function isFileOwner(file storage self, uint _index, address _fileOwner) internal view returns(bool) {
        return self.data[_index].goalAddress == _fileOwner;
    }

    function hasFunds(file storage self, uint _index) internal view returns(bool) {
        return (self.data[_index].isGoalReached == true) && (self.data[_index].donated > 0);
    }

    function firstIndex(file storage self) internal view returns (uint keyIndex) {
        return nextIndex(self, uint(0));
    }

    function isValid(file storage self, uint keyIndex) internal view returns (bool) {
        return keyIndex < self.keys.length;
    }

    function nextIndex(file storage self, uint keyIndex) internal view returns (uint) {
        uint r_keyIndex = keyIndex + 1;
        while (r_keyIndex < self.keys.length && self.keys[r_keyIndex].deleted) r_keyIndex++;
        return r_keyIndex;
    }

    function get(
        file storage self,
        uint keyIndex
    ) internal view returns (
        uint key,
        uint goal,
        string memory fileLink,
        string memory title,
        string memory description,
        address payable goalAddress,
        uint donated,
        uint dateCreated,
        bool isGoalReached
    ) {
        key = self.keys[keyIndex].key;
        goal = self.data[key].goal;
        fileLink = self.data[key].fileLink;
        title = self.data[key].title;
        description = self.data[key].description;
        goalAddress = self.data[key].goalAddress;
        donated = self.data[key].donated;
        dateCreated = self.data[key].dateCreated;
        isGoalReached = self.data[key].isGoalReached;
    }
}